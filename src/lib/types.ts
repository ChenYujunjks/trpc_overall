import { z } from "zod";

// 用户注册表单的 Schema
export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }), // 对应 userTable 的 email
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255), // 与 hashedPassword 对应
});

// 用户登录表单的 Schema
export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }), // 对应 userTable 的 email
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255), // 与 hashedPassword 对应
});
