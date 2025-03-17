"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { IconMoodSad } from "@tabler/icons-react";
import Link from "next/link";
import { register } from "../actions";
import { useState } from "react";
import { z } from "zod";
import { registerSchema } from "@/schemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSearchParams } from "next/navigation";
import VerifyPrompt from "./VerifyPrompt";

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const verify = searchParams.get("verify") === "true";

    console.log(verify);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerSuccessful, setRegisterSuccessful] = useState(verify ? true : false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function handleSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        setError("");

        const error = await register(values);
        console.log(error);
        if (error) {
            setError(error);
            setIsLoading(false);
            return;
        }

        setRegisterSuccessful(true);
    }

    return (
        <>
            {!registerSuccessful && (
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
                        <CardDescription className="text-center">
                            Create a new account with Dawnument today
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive" className="border-red-500 py-2">
                                <IconMoodSad />
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        )}
                        {/* Email & Password Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="py-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="py-2">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <>Creating...</> : "Create an account"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex justify-center p-6">
                        <div className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            )}

            {registerSuccessful && <VerifyPrompt />}
        </>
    );
}
