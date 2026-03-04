import ThemeProvider from "./ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import TanstackProvider from "./TanstackProvider";

type Props = {
    children: React.ReactNode
}

const AppProviders = ({ children }: Props) => {
    return (
        <NextIntlClientProvider>
            <TanstackProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </TanstackProvider>
        </NextIntlClientProvider>
    )
}

export default AppProviders