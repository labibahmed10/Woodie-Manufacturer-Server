import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
};
