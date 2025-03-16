"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectItem, SelectTrigger, Select, SelectValue, SelectContent } from "@/components/ui/select";
import { COUNTRIES_LIST } from "@/lib/consts";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { accountSetupSchema } from "@/schemas/userSchemas";
import { User } from "@supabase/supabase-js";
import { setup } from "../actions";

interface AccountSetupFormProps {
    user: User;
}

export default function AccountSetupForm({ user }: AccountSetupFormProps) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof accountSetupSchema>>({
        resolver: zodResolver(accountSetupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            country: "",
            email: user.email,
            dateOfBirth: new Date(),
        },
    });

    async function handleSubmit(values: z.infer<typeof accountSetupSchema>) {
        setIsLoading(true);
        setError("");

        const error = await setup(values);
        if (!error) redirect("/");

        setIsLoading(false);
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Set up your new account</CardTitle>
                <CardDescription className="text-center">
                    Setup your account below to start using Dawnument
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="disabled:bg-slate-200" type="email" {...field} disabled />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        {/* @ts-ignore */}
                                        <Input type="date" {...field} className="w-36" />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select your country" tabIndex={0} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent position="popper" className="h-48">
                                                {COUNTRIES_LIST.map((country, index) => (
                                                    <SelectItem key={index} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                        <Separator className="mt-8" />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <>Setting up...</> : "Continue"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
