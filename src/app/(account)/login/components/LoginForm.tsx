"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { login } from "../actions";
import { useState } from "react";
import { z } from "zod";
import { loginSchema } from "@/schemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMoodSad } from "@tabler/icons-react";

import { redirect } from "next/navigation";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function handleSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);
        setError("");

        try {
            await login(values);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Email not confirmed") redirect("/register?verify=true");
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
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
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <>Signing in...</> : "Sign In"}
                        </Button>
                    </form>
                </Form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                </div>

                <div>
                    <Button variant="outline" type="button" disabled={isLoading} onClick={() => console.log("Test")} className="w-full">
                        Google
                    </Button>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="flex justify-center p-6">
                <div className="text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                        Create an account
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
