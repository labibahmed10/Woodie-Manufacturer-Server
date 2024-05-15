import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  stripeKey: process.env.SECRET_API_STRIPE,
};

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
