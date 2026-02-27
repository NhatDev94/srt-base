import { LoginForm } from "@/features/auth/components/LoginForm"

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="space-y-4 w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage    