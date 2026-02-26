'use client';

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar";

const SideBarMenuButtonCustom = ({ children, url }: { children: React.ReactNode, url: string }) => {
    const pathname = usePathname();
    console.log(pathname, url);

    return (
        <SidebarMenuButton asChild isActive={pathname === url}>
            {children}
        </SidebarMenuButton>
    )
}

export default SideBarMenuButtonCustom;