"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthUIWrapper from "@/components/auth/AuthUIWrapper";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import Link from "next/link";

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Please contact support";
    case "auth/weak-password":
      return "Password should be at least 6 characters long";
    default:
      return "An error occurred. Please try again";
  }
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login
      router.push("/login");
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    }
  };

  return (
    <AuthUIWrapper>
      <AuthHeader type="signup" />
      <AuthInput
        type="email"
        placeholder="Email"
        required
        autoFocus
        value={email}
        onChange={(e) => {
          setError("");
          setEmail(e.target.value);
        }}
      />
      <AuthInput
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => {
          setError("");
          setPassword(e.target.value);
        }}
      />
      <AuthButton onClick={handleSignup} />
      {error && (
        <div className="flex flex-col gap-2">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600">
          Login
        </Link>
      </div>
    </AuthUIWrapper>
  );
}
