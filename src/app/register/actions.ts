"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { registerSchema } from "@/schemas/authSchemas";

import { createClient } from "@/utils/supabase/server";

export async function register(values: z.infer<typeof registerSchema>) {
    const result = registerSchema.safeParse(values);
    if (!result.success) return "Fatal error: Could not create an account";

    const supabase = await createClient();
    const { email, password } = result.data;
    const { error, data } = await supabase.auth.signUp({
        email,
        password,
    });

    const user = data?.user;

    if (user?.role === "") return "An account with that email already exists";
    if (error) return error.message;
}
