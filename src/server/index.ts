import { z } from "zod"; // 用于输入校验
import { SignUpFormSchema, SignInFormSchema } from "@/lib/types";
import { createTRPCRouter } from "./context";
import { signUp } from "@/server/auth/actions/signup";
import { signIn } from "@/server/auth/actions/signin";
import { publicProcedure } from "./context";
// 初始化 tRPC
const factorial = (n: number): number => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

// 创建 tRPC 路由
export const appRouter = createTRPCRouter({
  calculateFactorial: publicProcedure
    .input(z.number().int().min(0)) // 输入必须是非负整数
    .mutation(({ input }) => {
      if (input > 10) {
        throw new Error(
          "Number too large. Please provide a number less than or equal to 10."
        );
      }
      return { result: factorial(input) };
    }),
  signUp: publicProcedure
    .input(SignUpFormSchema) // 使用预定义的 Schema 验证输入
    .mutation(async ({ input }) => {
      return await signUp(input); // 调用抽取的 signUp 函数
    }),
  signIn: publicProcedure
    .input(SignInFormSchema) // 使用 Schema 验证输入
    .mutation(async ({ input }) => {
      return await signIn(input); // 调用 signIn 函数
    }),
});

export type AppRouter = typeof appRouter;
