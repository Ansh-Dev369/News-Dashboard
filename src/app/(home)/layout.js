"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { setArticles, setError, setLoading } from "@/context/slices/newsSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { articles, error } = useSelector((state) => state.news);

  const fetchArticles = async () => {
    try {
      if (articles?.length > 0) return;
      dispatch(setLoading(true));
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_FIREBASE_NEWS_API_KEY}`
      );
      const data = await response.json();
      dispatch(setArticles(data.articles));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (error) {
    return <div>Unable to Fetch Articles. Please try again later.</div>;
  }

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
