import { cookies } from "next/headers";
import { lucia } from ".";
import { cache } from "react";

export const getUser = cache(async () => {
  const cookiesObj = await cookies();
  const sessionId = cookiesObj.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  try {
    const { user, session } = await lucia.validateSession(sessionId);

    // 如果会话是新的，刷新 Cookie
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookiesObj.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    console.log("getUser's Cookies:", cookiesObj);
    console.log("getUser's SessionID:", sessionId);
    console.log("getUser's Session:", session);
    return user; // TypeScript now knows `user` is of type `User`
  } catch (error) {
    console.error("Session is invalid or expired:\n error:", error);
    return null;
  }
});
