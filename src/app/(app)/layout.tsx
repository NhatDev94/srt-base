import Header from "@/components/layout/Header"
import SideBar from "@/components/layout/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="w-screen h-dvh flex bg-background text-background-foreground">
                <SideBar />
                <div className="flex-1 h-full relative overflow-y-scroll">
                    <Header />
                    <div className="pt-14 px-4">{children}</div>
                </div>
            </div>
        </SidebarProvider>
    )
}