"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Email already exists or server error");
      }

      window.location.href = "/"; // Redirect on successful signup
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
