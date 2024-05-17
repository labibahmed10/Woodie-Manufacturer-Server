import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../utils/catchAsyncFunc";
import { AppError } from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";
import { AllUsersModel } from "../modules/users/users.model";

export const role = {
  admin: "admin",
} as const;

type UserRole = keyof typeof role;

const authMiddleware = (role: UserRole) => {
  return catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to access this");
    }

    const decoded = jwt.verify(token, config.accessTokenSecret as string) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access");
    }
    const { email } = decoded;

    const user = await AllUsersModel.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
    }

    if (role && !(role === "admin")) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not allowed");
    }
    req.user = email as JwtPayload;
    next();
  });
};

export default authMiddleware;
