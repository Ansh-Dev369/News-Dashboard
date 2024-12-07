"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthUIWrapper from "@/components/auth/AuthUIWrapper";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

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
      setError(err.message);
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthButton onClick={handleSignup} />
      {error && <p>{error}</p>}
    </AuthUIWrapper>
  );
}
