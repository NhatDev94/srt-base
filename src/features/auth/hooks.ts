import Cookies from 'js-cookie';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./services/auth.service";
import { LoginRequest } from "./types/auth.type";
import { toast } from "sonner";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (data: LoginRequest) => {
        setIsLoading(true);
        try {
            const res = await authService.login(data);

            if (res.success) {
                // Lưu vào Cookie để Middleware đọc được
                Cookies.set('access_token', res.data.accessToken, { expires: 7 }); // hết hạn sau 7 ngày
                toast.success(res.message || "Đăng nhập thành công");
                router.push("/");
            }
            // Lưu ý: Nếu success: false, Interceptor ở lib/api.ts đã tự show toast lỗi rồi.
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove("access_token");
        router.push("/login");
        toast.info("Đã đăng xuất");
    };

    return { login, logout, isLoading };
};