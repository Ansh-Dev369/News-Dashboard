"use client";

import ArticlesContainer from "@/components/article/ArticlesContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarTrigger } from "@/components/ui/sidebar";

const page = () => {
  return (
    <ProtectedRoute>
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
        <DashboardHeader>
          <SidebarTrigger />
          <h1 className="mt-1">Articles</h1>
        </DashboardHeader>
        <ArticlesContainer />
      </main>
    </ProtectedRoute>
  );
};

export default page;
