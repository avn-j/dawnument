"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function VerifyPrompt() {
    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Verify your account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>You have been sent an account verification email.</p>
                <p>Please follow the link sent in the email to activate your account.</p>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-center">
                <div className="text-sm text-slate-500">
                    Go back to{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                        sign in page
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
