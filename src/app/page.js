"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push(user ? "/dashboard" : "/login");
    }
  }, [user, loading, router]);

  return <div>Loading...</div>;
}
