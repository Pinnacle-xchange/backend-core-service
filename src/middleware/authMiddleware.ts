import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { CustomError } from "../utils/customError";

const protect = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        const userId: string = decoded.userId;

        req.userId = userId;

        next();
      } catch (error) {
        throw new CustomError("Not authorized, invalid token", 401);
      }
    } else {
      throw new CustomError("Not authorized, no token", 401);
    }
  }
);
export { protect };
