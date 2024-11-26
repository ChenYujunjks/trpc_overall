import { getUser } from "@/server/auth/getUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "@/server/auth/logout";

export default async function HomePage() {
  const user = await getUser(); // 调用 getUser 获取用户信息
  console.log("user:", user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Our App</h1>
      {user ? (
        <div className="space-y-4 text-center">
          <p className="text-xl">Welcome, {user.email}!</p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <form action={logout}>
            <Button variant={"destructive"} className="rounded-full">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <p className="text-xl">You are not logged in.</p>
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
