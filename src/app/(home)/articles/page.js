"use client";

import ArticlesContainer from "@/components/article/ArticlesContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { setArticles, setLoading, setError } from "@/context/slices/newsSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const page = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.news);

  async function handleClick() {
    if (articles.length > 0) return;
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_FIREBASE_NEWS_API_KEY}`
      );
      const data = await response.json();
      console.log(data.articles);

      // Store articles in Redux
      dispatch(setArticles(data.articles));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }

  useEffect(() => {
    console.log("fetching articles");
    handleClick();
  }, []);

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
