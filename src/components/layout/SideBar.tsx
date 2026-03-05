'use client';

import { sidebarMenu } from "@/config/sidebar/sidebar.config";
import Brand from "./Brand";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@nhatdev94/common-ui"
import Link from "next/link";
import SideBarMenuButtonCustom from "./SideBarMenuButtonCustom";


const SideBar = () => {

    return (
        <Sidebar className="py-2">
            <SidebarHeader className="px-4">
                <Brand />
            </SidebarHeader>
            <SidebarContent>
                {sidebarMenu.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title} >
                                        <SideBarMenuButtonCustom url={item.url}>
                                            <Link href={item.url}>
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                {item.title}
                                            </Link>
                                        </SideBarMenuButtonCustom>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default SideBar;
