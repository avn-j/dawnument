import RegisterForm from "./components/RegisterForm";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/authFunctions";

export default async function RegisterPage() {
    const user = await getUser();
    if (user) redirect("/");

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md px-4">
                <RegisterForm />
            </div>
        </div>
    );
}
