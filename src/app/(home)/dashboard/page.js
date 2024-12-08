"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import PayoutPrice from "@/components/payout/PayoutPrice";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
        <DashboardHeader>
          <SidebarTrigger />
          <div className="flex items-center justify-between w-full">
            <h1 className="mt-1 dark:text-white">Dashboard</h1>
            <ThemeToggle />
          </div>
        </DashboardHeader>
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-[#18181a] h-full">
          <PayoutPrice />
          <Separator className="my-6" />
          <DashboardCharts />
        </div>
      </main>
    </ProtectedRoute>
  );
}
