"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { accountSetupSchema } from "@/schemas/userSchemas";
import { getUser } from "@/lib/authFunctions";
import { createAppUser } from "@/services/userService";
import { DataValidationError, NotFoundError, UserFriendlyError } from "@/utils/errors";
import { AuthError } from "@supabase/supabase-js";

export async function setup(values: z.infer<typeof accountSetupSchema>) {
    try {
        const result = accountSetupSchema.safeParse(values);
        if (!result.success) throw new DataValidationError("Invalid account setup data.");

        const { firstName, lastName, email, country, dateOfBirth } = result.data;

        const user = await getUser();
        if (!user) throw new AuthError("User is not authenticated.");

        const userAccount = await createAppUser({
            id: user.id,
            firstName,
            lastName,
            email,
            country,
            dateOfBirth: new Date(dateOfBirth),
        });
        if (!userAccount) throw new NotFoundError("User account could not be found.");
    } catch (error) {
        if (error instanceof AuthError) throw new UserFriendlyError("You must be logged in to setup your account.");
        throw new UserFriendlyError("An unexpected error has occurred.");
    }

    redirect("/");
}
