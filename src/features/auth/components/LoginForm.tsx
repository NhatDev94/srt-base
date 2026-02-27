"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks";

export const LoginForm = () => {
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-center">STR Miền Nam</h1>
            <div className="space-y-2">
                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang xác thực..." : "Đăng nhập"}
            </Button>
        </form>
    );
};