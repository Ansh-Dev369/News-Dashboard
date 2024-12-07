import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </div>
  );
};

export default HomeLayout;
