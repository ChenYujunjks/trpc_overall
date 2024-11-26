import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { lucia } from "@/server/auth";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { TRPCError } from "@trpc/server";
import { SignUpFormSchema } from "@/lib/types";

/**
 * 用户注册逻辑
 * @param input - 包含 email 和 password 的注册信息
 * @returns 返回 sessionId 和成功消息
 */
export const signUp = async (input: { email: string; password: string }) => {
  // 使用 SignUpFormSchema 验证输入
  const { email, password } = SignUpFormSchema.parse(input);

  // Hash 密码
  const hashedPassword = await new (
    await import("oslo/password")
  ).Argon2id().hash(password);

  const userId = generateId(15);

  try {
    // 插入用户数据到数据库
    await db.insert(userTable).values({
      id: userId,
      email,
      hashedPassword,
    });
  } catch (e: any) {
    if (e.code === "ER_DUP_ENTRY" || e.message.includes("Duplicate entry")) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }
    console.error("Database error:", e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create user",
    });
  }

  // 创建会话并返回会话 ID
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookiesObj = await cookies();
  cookiesObj.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    message: "Signup successful",
  };
};
