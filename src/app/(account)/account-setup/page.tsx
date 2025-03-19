import { getUser } from "@/lib/authFunctions";
import { redirect } from "next/navigation";
import AccountSetupForm from "./components/AccountSetupForm";
import { checkProfileCreated, getUserById } from "@/services/userService";

export default async function AccountSetupPage() {
    const user = await getUser();
    if (!user) redirect("/login");
    const profileCreated = await checkProfileCreated(user.id);
    if (profileCreated) redirect("/");

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md px-4">
                <AccountSetupForm user={user} />
            </div>
        </div>
    );
}
