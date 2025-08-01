import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql= neon(process.env.NEON_DATABASE_URL!);
if (!sql) {
  throw new Error("NEON_DATABASE_URL is not defined");
}
const db = drizzle(sql);
if (!db) {
  throw new Error("Failed to initialize the database connection");
}
export { db };
