'use client';

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@nhatdev94/common-ui";

const SideBarMenuButtonCustom = ({ children, url }: { children: React.ReactNode, url: string }) => {
    const pathname = usePathname();

    return (
        <SidebarMenuButton asChild isActive={pathname === url}>
            {children}
        </SidebarMenuButton>
    )
}

export default SideBarMenuButtonCustom;