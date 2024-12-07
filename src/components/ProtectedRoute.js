"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return user ? children : null;
}
