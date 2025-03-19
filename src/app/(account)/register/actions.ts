"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { registerSchema } from "@/schemas/authSchemas";

import { createClient } from "@/utils/supabase/server";
import { DataValidationError, UserFriendlyError } from "@/utils/errors";
import { AuthError } from "@supabase/supabase-js";

export async function register(values: z.infer<typeof registerSchema>) {
    const result = registerSchema.safeParse(values);
    try {
        if (!result.success) throw new DataValidationError("Register data is invalid.");

        const supabase = await createClient();
        const { email, password } = result.data;
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw new AuthError(error.message);

        const user = data?.user;
        if (user?.role === "") throw new AuthError("An account with that email already exists.");
    } catch (error) {
        if (error instanceof AuthError) throw new UserFriendlyError(error.message);
        throw new UserFriendlyError("An unexpected error has occurred. Please try again");
    }
}
