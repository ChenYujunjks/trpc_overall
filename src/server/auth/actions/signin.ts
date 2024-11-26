import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { lucia } from "@/server/auth";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { SignInFormSchema } from "@/lib/types";
/**
 * 用户登录逻辑
 * @param input - 包含 email 和 password 的登录信息
 * @returns 返回会话 ID 和成功消息
 */
export const signIn = async (input: { email: string; password: string }) => {
  // 使用 SignInFormSchema 验证输入
  const { email, password } = SignInFormSchema.parse(input);

  // 查询用户
  const existingUser = (
    await db.select().from(userTable).where(eq(userTable.email, email))
  )[0];

  if (!existingUser) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User does not exist",
    });
  }

  // 验证密码
  const validPassword = await new (
    await import("oslo/password")
  ).Argon2id().verify(existingUser.hashedPassword, password);

  if (!validPassword) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Incorrect password",
    });
  }

  // 创建会话
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookiesObj = await cookies();
  cookiesObj.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    message: "Signin successful",
  };
};
