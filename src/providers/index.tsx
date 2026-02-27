import { RootState } from "@/lib/redux/store";
import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
    children: React.ReactNode
    initialState: Partial<RootState>
}

const AppProviders = ({ children, initialState }: Props) => {
    return (
        <ReduxProvider initialState={initialState}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </ReduxProvider>
    )
}

export default AppProviders