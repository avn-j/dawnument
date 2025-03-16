"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/");
}
