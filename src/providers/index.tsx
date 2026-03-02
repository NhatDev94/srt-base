import { RootState } from "@/lib/redux/store";
import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';

interface Props {
    children: React.ReactNode
    initialState: Partial<RootState>
}

const AppProviders = ({ children, initialState }: Props) => {
    return (
        <NextIntlClientProvider>
            <ReduxProvider initialState={initialState}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </ReduxProvider>
        </NextIntlClientProvider>
    )
}

export default AppProviders