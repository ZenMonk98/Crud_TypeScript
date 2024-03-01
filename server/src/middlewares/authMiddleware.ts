import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authmiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];

    if (token) {
      jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
        if (err) {
          res.status(403).json({ message: "Invalid Token" });
        } else {
          if (!user) {
            return res.sendStatus(403);
          }
          if (typeof user === "string") {
            return res.sendStatus(403);
          }
          req.headers["userId"] = user.id;
          next();
        }
      });
    }
  } else {
    res.status(401).send({ message: "Unauthorized: User Not Authenticated" });
  }
};
