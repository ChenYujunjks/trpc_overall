"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/components/provider";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // tRPC Mutation
  const signUpMutation = trpc.signUp.useMutation({
    onSuccess: (data) => {
      console.log(data.message); // Optional: 可以显示成功消息
      window.location.href = "/"; // Redirect after signup
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
    },
  });

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      signUpMutation.mutate({ email, password }); // 调用 tRPC 的 signUp API
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <div className="space-y-2">
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
