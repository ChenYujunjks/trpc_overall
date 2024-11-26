import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionTable = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  expiresAt: timestamp("expires").notNull(),
});
