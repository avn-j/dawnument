import { createClient } from "@/utils/supabase/server";
import RegisterForm from "./components/RegisterForm";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) redirect("/");

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md px-4">
                <RegisterForm />
            </div>
        </div>
    );
}
