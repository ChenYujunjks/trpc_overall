"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignUpFormSchema } from "@/lib/types"; // 引入复用的校验规则
import { trpc } from "@/components/provider";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  // 初始化 react-hook-form
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  // tRPC Mutation
  const signUpMutation = trpc.signUp.useMutation({
    onSuccess: () => {
      window.location.href = "/"; // 注册成功后跳转
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
    },
  });

  const handleSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    setError(null);
    signUpMutation.mutate(data); // 调用 tRPC 的 signUp API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                disabled={!SignUpFormSchema.safeParse(form.getValues()).success}
                type="submit"
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
