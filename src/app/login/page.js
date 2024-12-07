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
    try {
      // signing in with email and password using firebase auth
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // if the user is loading, then showing a loading indicator
  if (loading || user) {
    return <div>Loading...</div>;
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        type="password"
        placeholder="Password"
        value={password}
        disabled={loading}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthButton onClick={handleLogin} />
      {error && <p>{error}</p>}
    </AuthUIWrapper>
  );
}
