import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
config({ path: ".env" });
import * as schema from "./schema";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle({ client: pool, schema, logger: false });
