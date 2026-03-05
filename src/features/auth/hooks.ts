import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import { Credentials } from "@/features/auth/types/auth.type";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

export const useLoginMutation = () => {
    const t = useTranslations('Auth')
    const router = useRouter()
    const login = useStore(state => state.login)

    return useMutation({
        mutationFn: async (credentials: Credentials) => {
            const response = await authService.login(credentials)
            if (!response.success) throw new Error("Sai tài khoản hoặc mật khẩu");
            return response.data;
        },
        onSuccess: (data: any) => {
            // quản lí bằng Cookie
            // Lưu vào Cookie để Middleware đọc được
            // Cookies.set('access_token', res.data.accessToken, { expires: 7 }); // hết hạn sau 7 ngày
            // toast.success(t('login.success'))
            // router.push("/");

            // demo quản lý auth bằng zustand
            login(data.user, data.accessToken)
            toast.success(t('login.success'))
            Cookies.set('access_token', data.accessToken, { expires: 7 });
            router.push('/')
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    })
}

export const useLogoutMutation = () => {
    const t = useTranslations('Auth')
    const router = useRouter()
    const logout = useStore(state => state.logout)

    return useMutation({
        mutationFn: async () => {
            const response = await authService.logout()
            return response.data
        },
        onSuccess: () => {
            // Cookies.remove("access_token");
            // router.push("/login");
            // toast.info("Đã đăng xuất");

            logout()
            Cookies.remove("access_token");
            router.push('/login')
            toast.info(t('logout.success'))
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    })
}





// export const useAuth = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();

//     const login = async (data: LoginRequest) => {
//         setIsLoading(true);
//         try {
//             const res = await authService.login(data);

//             if (res.success) {
//                 // Lưu vào Cookie để Middleware đọc được
//                 Cookies.set('access_token', res.data.accessToken, { expires: 7 }); // hết hạn sau 7 ngày
//                 toast.success(res.message || "Đăng nhập thành công");
//                 router.push("/");
//             }
//             // Lưu ý: Nếu success: false, Interceptor ở lib/api.ts đã tự show toast lỗi rồi.
//         } catch (error) {
//             console.error("Login Error:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const logout = () => {
//         Cookies.remove("access_token");
//         router.push("/login");
//         toast.info("Đã đăng xuất");
//     };

//     return { login, logout, isLoading };
// };