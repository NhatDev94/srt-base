import LanguageToggle from "@/components/common/LanguageToggle"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { LoginForm } from "@/features/auth/components/LoginForm"
import { getTranslations } from "next-intl/server"

const LoginPage = async () => {
    const t = await getTranslations("Auth.login")
    return (
        <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
            <div className="fixed top-6 right-6 z-50 flex items-center gap-x-4">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg border border-border transition-all">
                <div className="flex flex-col space-y-2 text-center mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage    