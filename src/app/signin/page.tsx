"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Invalid credentials or server error");
      }

      window.location.href = "/"; // Redirect on successful login
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
