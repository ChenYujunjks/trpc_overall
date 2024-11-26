"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/components/provider";

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // tRPC Mutation
  const signInMutation = trpc.signIn.useMutation({
    onSuccess: (data) => {
      console.log(data.message); // 可选：显示成功消息
      window.location.href = "/"; // 登录成功后跳转
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
    },
  });

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      signInMutation.mutate({ email, password }); // 调用 tRPC 的 signIn API
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignin} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Sign In</h1>

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
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
