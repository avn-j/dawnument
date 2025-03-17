import { getUser } from "@/lib/authFunctions";
import Navbar from "./components/Navbar";
import { getUserById } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUser();
    if (!user) redirect("/login");
    const account = await getUserById(user.id);
    if (!account) redirect("/account-setup");

    return (
        <div className="flex">
            <Navbar account={account} />
            {children}
        </div>
    );
}
