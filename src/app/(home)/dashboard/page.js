"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PayoutPrice from "@/components/payout/PayoutPrice";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
        <DashboardHeader>
          <SidebarTrigger />
          <h1 className="mt-1">Dashboard</h1>
        </DashboardHeader>
        <PayoutPrice />
      </main>
    </ProtectedRoute>
  );
}
