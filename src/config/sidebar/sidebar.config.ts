import { SideBarMenuItem } from "./sidebar.type";
import { LayoutDashboard, User, ChartColumnBig, FolderDot } from "lucide-react"
export const sidebarMenu: SideBarMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: ChartColumnBig
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderDot
  },
  { 
    title: "Team", 
    path: "/team",
    icon: User  
  },
]