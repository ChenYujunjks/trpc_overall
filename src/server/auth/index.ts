import { Lucia } from "lucia";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db";
import { sessionTable, userTable } from "../db/schema";

export const lucia = new Lucia(
  new DrizzleMySQLAdapter(db, sessionTable, userTable),
  {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        email: attributes.email,
      };
    },
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
