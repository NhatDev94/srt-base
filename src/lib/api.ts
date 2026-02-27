import Cookies from 'js-cookie';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BaseResponse } from "@/types/api.type";
import { toast } from "sonner";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.str-miennam.com/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- 1. REQUEST INTERCEPTOR: Gắn Token vào mỗi yêu cầu ---
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('access_token'); // Lấy từ Cookie
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- 2. RESPONSE INTERCEPTOR: Xử lý lỗi tập trung ---
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Nếu BE trả về success: false mặc dù status là 200
        const res = response.data as BaseResponse<any>;
        if (res && !res.success) {
            toast.error(res.message || "Đã có lỗi xảy ra");
        }
        return response;
    },
    (error: AxiosError) => {
        const response = error.response as AxiosResponse<BaseResponse<any>>;
        const status = response?.status;
        const data = response?.data;

        switch (status) {
            case 400:
                toast.error(data?.message || "Dữ liệu không hợp lệ");
                break;
            case 401:
                // LỖI CHƯA ĐĂNG NHẬP: Xóa token và đá về Login
                Cookies.remove("access_token");
                toast.error("Phiên làm việc hết hạn, vui lòng đăng nhập lại");
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                break;
            case 403:
                toast.error("Bạn không có quyền thực hiện hành động này");
                break;
            case 500:
                toast.error("Hệ thống đang bảo trì, vui lòng quay lại sau");
                break;
            default:
                toast.error("Lỗi kết nối đến máy chủ");
        }

        return Promise.reject(error);
    }
);

export default api;