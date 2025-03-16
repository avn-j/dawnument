"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { accountSetupSchema } from "@/schemas/userSchemas";
import { getUser } from "@/lib/authFunctions";
import prisma from "@/utils/prisma/client";

export async function setup(values: z.infer<typeof accountSetupSchema>) {
    const result = accountSetupSchema.safeParse(values);
    if (!result.success) return "An unexpected error has occurred. Please try again.";

    const { firstName, lastName, email, country, dateOfBirth } = result.data;

    const user = await getUser();
    if (!user) return null;

    const userAccount = await prisma.user.create({
        data: {
            id: user.id,
            firstName,
            lastName,
            email,
            country,
            dateOfBirth: new Date(dateOfBirth),
        },
    });

    console.log(userAccount);

    if (!userAccount) return "Could set up user account. Please try again";

    redirect("/");
}
