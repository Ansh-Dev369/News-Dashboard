"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // if there is no user and also not loading, then redirecting to the login page
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // if the user is loading, then showing a loading indicator
  if (loading) return <p>Loading...</p>;

  // if the user is authenticated, then rendering the children
  return user ? children : null;
}
