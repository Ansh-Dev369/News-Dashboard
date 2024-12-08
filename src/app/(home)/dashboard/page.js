"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { setArticles, setLoading, setError } from "@/context/slices/newsSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.news);

  const fetchArticles = async () => {
    try {
      if (articles.length > 0) return;
      dispatch(setLoading(true));
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_FIREBASE_NEWS_API_KEY}`
      );
      const data = await response.json();
      dispatch(setArticles(data.articles));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ProtectedRoute>
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
        <DashboardHeader>
          <SidebarTrigger />
          <h1 className="mt-1">Dashboard</h1>
        </DashboardHeader>
      </main>
    </ProtectedRoute>
  );
}
