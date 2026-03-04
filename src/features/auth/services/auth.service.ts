import api from "@/lib/api";
import { BaseResponse } from "@/types/api.type";
import { Credentials, LoginResponse } from "../types/auth.type";

const isDemo = true
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
    login: async (data: Credentials): Promise<BaseResponse<LoginResponse>> => {
        if (isDemo) {
            await sleep(1500);
            if (data.email === "admin@gmail.com" && data.password === "Sam1234@") {
                return {
                    success: true,
                    message: "Đăng nhập thành công (Dữ liệu Mock)",
                    data: {
                        accessToken: "mock_access_token_str_miennam",
                        refreshToken: "mock_refresh_token",
                        user: {
                            id: "u1",
                            fullName: "Nguyễn Văn Admin",
                            email: "admin@gmail.com",
                            role: "admin",
                        },
                    },
                };
            }
            return {
                success: false,
                message: "Email hoặc mật khẩu không chính xác",
                data: null as any,
            };
        }


        const res = await api.post<BaseResponse<LoginResponse>>("/auth/login", data);
        return res.data;
    },
    logout: async (): Promise<BaseResponse<void>> => {
        if (isDemo) {
            await sleep(500);
            return {
                success: true,
                message: "Đăng xuất thành công",
                data: undefined as any,
            };
        }
        const res = await api.post<BaseResponse<void>>("/auth/logout");
        return res.data;
    }
}