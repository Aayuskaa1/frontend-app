import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs/constant";
import { UserMongoRepository } from "../repositories/user.repository";
import { ApiResponseHelper } from "../utils/apihelper.util";
import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";
}

const userRepository = new UserMongoRepository();

export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json(ApiResponseHelper.error("Unauthorized: No token provided", 401));
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      res
        .status(401)
        .json(ApiResponseHelper.error("Unauthorized: User not found", 401));
      return;
    }

    req.user = user;
    next();
  } catch {
    res
      .status(401)
      .json(ApiResponseHelper.error("Unauthorized: Invalid token", 401));
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res
      .status(403)
      .json(ApiResponseHelper.error("Forbidden: Admin access required", 403));
    return;
  }

  next();
};
