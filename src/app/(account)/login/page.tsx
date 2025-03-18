import LoginForm from "./components/LoginForm";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/authFunctions";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
    const user = await getUser();
    if (user) redirect("/");

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md px-4">
                <LoginForm />
            </div>
        </div>
    );
}
