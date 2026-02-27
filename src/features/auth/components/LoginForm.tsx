"use client";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import InputPassword from "@/components/ui/input-password";

const formSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(6, "Mật khẩu tối thiểu 6 ký tự"),
})

export const LoginForm = () => {
    const { login, isLoading } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        login(data);
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full" >
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-email">
                                Email
                                <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your email"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-password">
                                Password
                                <span className="text-destructive">*</span>
                            </FieldLabel>

                            <InputPassword
                                {...field}
                                id="form-rhf-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                {isLoading ? "Đang xác thực..." : "Đăng nhập"}
            </Button>
        </form>
    );
};