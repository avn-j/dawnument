import { getUser } from "@/lib/authFunctions";
import { getUserById } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getUser();
    if (!user) redirect("/login");

    const userAccount = await getUserById(user.id);
    if (!userAccount) redirect("/account-setup");

    redirect("/dashboard");

    return <></>;
}
