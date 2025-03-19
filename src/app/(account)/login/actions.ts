"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "@/schemas/authSchemas";

import { createClient } from "@/utils/supabase/server";
import { DataValidationError, UserFriendlyError } from "@/utils/errors";
import { AuthError } from "@supabase/supabase-js";
import { User } from "lucide-react";

export async function login(data: z.infer<typeof loginSchema>) {
    try {
        const result = loginSchema.safeParse(data);
        if (!result.success) throw new DataValidationError("Login data is invalid.");

        const supabase = await createClient();
        const { email, password } = result.data;
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new AuthError(error.message);
        redirect("/");
    } catch (error) {
        if (error instanceof AuthError) throw new UserFriendlyError(error.message);
        throw new UserFriendlyError("An unexpected error occurred. Please try again.");
    }
}
