"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSelector } from "react-redux";
import AuthUIWrapper from "@/components/auth/AuthUIWrapper";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import Link from "next/link";
import FullScreenLoader from "@/components/FullScreenLoader";

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later";
    default:
      return "An error occurred. Please try again";
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // if the user is not in loading state and the user is authenticated, then redirecting to the dashboard
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    if (!password || !email) {
      setError("Please enter your email and password");
      return;
    }
    try {
      // signing in with email and password using firebase auth
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    }
  };

  // if the user is loading, then showing a loading indicator
  if (loading || user) {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <AuthUIWrapper>
      <AuthHeader type="login" />
      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        disabled={loading}
        required
        autoFocus
        onChange={(e) => {
          setError("");
          setEmail(e.target.value);
        }}
      />
      <AuthInput
        type="password"
        placeholder="Password"
        value={password}
        disabled={loading}
        required
        onChange={(e) => {
          setError("");
          setPassword(e.target.value);
        }}
      />
      <AuthButton onClick={handleLogin} />
      {error && (
        <div className="flex flex-col gap-2">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div>
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </div>
    </AuthUIWrapper>
  );
}
