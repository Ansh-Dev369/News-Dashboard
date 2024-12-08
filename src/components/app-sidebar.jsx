import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LogOut,
  LayoutDashboard,
  Newspaper,
  Wallet,
  ChevronRight,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "@/lib/firebase";
import { clearUser } from "@/context/slices/authSlice";
import { Button } from "./ui/button";
import Image from "next/image";

// Navigation items for sidebar
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Articles",
    url: "/articles",
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    title: "Payouts",
    url: "/payouts",
    icon: <Wallet className="w-5 h-5" />,
  },
];

export function AppSidebar({ ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Newspaper className="w-6 h-6" />
          <span className="font-semibold text-lg">News Dashboard</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex flex-col h-full pt-2">
          {/* Navigation Menu */}
          <SidebarMenu className="flex-1">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-lg group">
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {/* Logout Button */}
          <div className="p-4 mt-auto border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
