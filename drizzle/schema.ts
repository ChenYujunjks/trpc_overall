import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const sessions = mysqlTable("sessions", {
	id: varchar({ length: 255 }).notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionsId: primaryKey({ columns: [table.id], name: "sessions_id"}),
	}
});

export const users = mysqlTable("users", {
	id: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
	}
});
