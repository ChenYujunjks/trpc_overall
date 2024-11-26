"use server";
import { cookies } from "next/headers";
import { lucia } from "@/server/auth";
import { redirect } from "next/navigation";

export async function logout() {
  const cookiesObj = await cookies();

  // 获取会话 ID
  const sessionId = cookiesObj.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      error: "Unauthorized",
    };
  }

  // 使当前会话失效
  await lucia.invalidateSession(sessionId);

  // 创建一个空白的会话 Cookie，覆盖之前的会话 Cookie
  const sessionCookie = lucia.createBlankSessionCookie();
  cookiesObj.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
