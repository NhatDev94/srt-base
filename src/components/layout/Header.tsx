'use client';

import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "./NavUser";
import { usePathname } from "next/navigation";

const Header = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
    }

    const pathname = usePathname();


    return (
        <div className="absolute top-0 left-0 z-50 w-full h-14 p-4 border-b border-black/10 flex items-center justify-between">
            <div className="w-fit flex items-center gap-x-4">
                <SidebarTrigger className="p-2 rounded-md hover:bg-gray-100" />
                <h4 className="w-fit text-base font-semibold capitalize">{pathname.split("/").pop()?.replace("-", " ") || 'Dashboard'}</h4>
            </div>
            <div className="flex items-center gap-2">
                <NavUser user={user} />
            </div>
        </div>
    )
}

export default Header;