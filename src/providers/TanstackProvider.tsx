"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
    // Tạo QueryClient trong useState để tránh việc tạo lại client mỗi khi re-render
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient} >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}