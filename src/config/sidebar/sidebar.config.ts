import { ChartColumnBig, LayoutDashboard } from "lucide-react"

type NavMainType = {
  title: string;
  url: string;
  items: MenuItemType[];
}

type MenuItemType = {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const sidebarMenu: NavMainType[] = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: ChartColumnBig
      },
    ],
  },
  {
    title: "Build Your Application",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
      {
        title: "Rendering",
        url: "#",
      }
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      {
        title: "Components",
        url: "#",
      },
      {
        title: "File Conventions",
        url: "#",
      },
      {
        title: "Functions",
        url: "#",
      },

    ],
  },
  {
    title: "Architecture",
    url: "#",
    items: [
      {
        title: "Accessibility",
        url: "#",
      },
      {
        title: "Fast Refresh",
        url: "#",
      }
    ],
  },
]