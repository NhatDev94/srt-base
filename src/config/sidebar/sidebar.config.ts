import { SideBarMenuItem } from "./sidebar.type";
import { LayoutDashboard, User, ChartColumnBig, FolderDot } from "lucide-react"
export const sidebarMenu: SideBarMenuItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartColumnBig
  },
  {
    title: "Projects",
    href: "/analytics",
    icon: FolderDot
  },
  { 
    title: "Team", 
    href: "/analytics",
    icon: User  
  },
]