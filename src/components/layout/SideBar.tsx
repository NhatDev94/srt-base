import { sidebarMenu } from "@/config/sidebar/sidebar.config";
import Brand from "./Brand";
import Link from "next/link";


const SideBar = () => {
    

    return (
        <div className="w-full py-2">
           <div className="px-4">
            <Brand />
           </div>

            <div className="">
                <p className="px-4 mt-6 mb-2 text-xs font-normal text-muted-foreground">Home</p>
                {
                    sidebarMenu.map((item) => (
                        <Link href={item.href} key={item.href} className="px-4 py-2 flex items-center gap-x-2 cursor-pointer hover:bg-accent">
                            {item.icon && <item.icon className="w-4 h-4 text-foreground" />}
                           <p className="text-sm font-normal text-foreground">
                             {item.title}
                           </p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;
