import { sidebarMenu } from "@/src/config/sidebar/sidebar.config";
import Brand from "./Brand";


const SideBar = () => {
    

    return (
        <div className="w-full py-2">
           <div className="px-4">
            <Brand />
           </div>

            <div className="">
                <p className="px-4 mt-6 text-xs font-normal text-gray-400">Home</p>
                {
                    sidebarMenu.map((item) => (
                        <div key={item.path} className="px-4 py-2 flex items-center gap-x-2 cursor-pointer hover:bg-gray-200">
                            {item.icon && <item.icon className="w-4 h-4 text-gray-500" />}
                           <p className="text-sm font-normal">
                             {item.title}
                           </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;
