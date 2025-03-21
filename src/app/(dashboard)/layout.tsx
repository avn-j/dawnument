import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import { getUser } from "@/lib/authFunctions";
import { redirect } from "next/navigation";
import { checkProfileCreated, getUserById } from "@/services/userService";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUser();
    if (!user) redirect("/login");
    const profileCreated = await checkProfileCreated(user.id);
    if (!profileCreated) redirect("/account-setup");
    const account = await getUserById(user.id);
    if (!account) redirect("/login");

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <main className="flex">
                    <Navbar account={account} />
                    {children}
                    <Toaster />
                </main>
            </body>
        </html>
    );
}
