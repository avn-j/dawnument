"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, NotebookPen, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IconPencil } from "@tabler/icons-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Journal", href: "/journal", icon: NotebookPen },
    { name: "Settings", href: "/settings", icon: Settings },
];

interface NavbarProps {
    account: User;
}

export default function Navbar({ account }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar (Always Visible on Desktop) */}
            <aside className="hidden md:flex flex-col w-72 h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 border-r">
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-4">dawnument</h1>

                <div className="px-4 py-4 text-sm font-medium flex gap-3 items-center">
                    <div className="bg-gray-300 p-3 rounded-full border-2 border-gray-400">AA</div>
                    <div>
                        <p className="text-gray-900 font-bold">
                            {account.firstName} {account.lastName}
                        </p>
                        <p className="text-gray-500 text-xs">{account.email}</p>
                    </div>
                </div>
                <Separator />
                <nav className="pt-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/journal/new"
                        className="flex items-center gap-3 px-4 py-4 bg-gray-800 text-gray-200 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
                    >
                        <IconPencil className="w-5 h-5" />
                        New Journal Entry
                    </Link>
                </nav>
            </aside>

            {/* Mobile Navigation (Hidden on Desktop) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden absolute top-4 left-4" onClick={() => setIsOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Dawnument</h1>
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
