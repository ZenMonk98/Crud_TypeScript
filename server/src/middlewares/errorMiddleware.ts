import { Request, Response, NextFunction } from "express";
import CustomErrorHandler from "../utils/ErrorHandler";

export const errorMiddleware = async (
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500);
  res.send({
    error: {
      status: err.statusCode || 500,
      message: err.message || "Internal Server Error !",
    },
  });
};
