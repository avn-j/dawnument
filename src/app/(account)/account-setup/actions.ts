"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { accountSetupSchema } from "@/schemas/userSchemas";
import { getUser } from "@/lib/authFunctions";
import { createUser } from "@/services/userService";

export async function setup(values: z.infer<typeof accountSetupSchema>) {
    const result = accountSetupSchema.safeParse(values);
    if (!result.success) return "An unexpected error has occurred. Please try again.";

    const { firstName, lastName, email, country, dateOfBirth } = result.data;

    const user = await getUser();
    if (!user) return null;

    const userAccount = await createUser({
        id: user.id,
        firstName,
        lastName,
        email,
        country,
        dateOfBirth: new Date(dateOfBirth),
    });
    if (!userAccount) return "Could set up user account. Please try again";

    redirect("/");
}
