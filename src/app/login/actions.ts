"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "@/schemas/authSchemas";

import { createClient } from "@/utils/supabase/server";

export async function login(data: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(data);
    if (!result.success) return "Fatal error: Could not login";

    const supabase = await createClient();
    const { email, password } = result.data;
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) return error.message;

    redirect("/");
}
