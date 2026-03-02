import Cookies from 'js-cookie';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BaseResponse } from "@/types/api.type";
import { ApiError } from '@/types/api-error.type';
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
            const apiError: ApiError = {
                status: response.status,
                message: res.message || "Có lỗi xảy ra",
                errors: res.errors,
            };

            return Promise.reject(apiError);
        }
        return response;
    },
    (error: AxiosError) => {
        const response = error.response as AxiosResponse<BaseResponse<any>>;
        const status = response?.status;
        const data = response?.data;
        let apiError: ApiError;
        switch (status) {
            case 400:
                apiError = {
                    status,
                    message: data?.message || "Dữ liệu không hợp lệ",
                    errors: data?.errors,
                };
                break;
            case 401:
                // LỖI CHƯA ĐĂNG NHẬP: Xóa token và đá về Login
                // Cookies.remove("access_token");
                apiError = {
                    status,
                    message: "Phiên đăng nhập hết hạn",
                };
                break;
            case 403:
                apiError = {
                    status,
                    message: "Bạn không có quyền truy cập",
                };
                break;
            case 500:
                apiError = {
                    status,
                    message: "Lỗi hệ thống",
                };
                break;
            default:
                apiError = {
                    status,
                    message: data?.message || "Lỗi kết nối đến máy chủ",
                };
        }

        return Promise.reject(apiError);
    }
);

export default api;