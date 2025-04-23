import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Auth from "../models/authModel";
import { z } from "zod";

const SignUpInput = z.object({
  name: z.string(),
  username: z.string().email(),
  password: z.string(),
});

const SigInInputs = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedInputs = SignUpInput.safeParse(req.body);

    if (!parsedInputs.success) {
      return res.status(411).json({ message: parsedInputs.error });
    }

    const registeredUser = await Auth.findOne({
      username: parsedInputs.data.username,
    });

    if (registeredUser) {
      res
        .status(400)
        .send({ success: false, message: "User Already Registered." });
    } else {
      const newUser = new Auth({
        name: parsedInputs.data.name,
        username: parsedInputs.data.username,
      });

      newUser.password = await newUser.generateHash(parsedInputs.data.password);

      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User Registered Successfully." });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedInputs = SigInInputs.safeParse(req.body);

    if (!parsedInputs.success) {
      return res.status(411).json({ message: parsedInputs.error });
    }

    const findUser = await Auth.findOne({
      username: parsedInputs.data.username,
    });

    if (findUser) {
      const isValidPassword = await findUser.validatePassword(
        parsedInputs.data.password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          {
            id: findUser._id,
          },
          String(process.env.JWT_SECRET),
          { expiresIn: "1h" }
        );

        res.status(200).json({
          success: true,
          token,
          message: "User Logged In Successfully",
        });
      } else {
        res.json({ success: false, message: "Invalid Password." });
      }
    } else {
      res.status(401).json({ success: false, message: "User Not Found." });
    }
  } catch (error) {
    next(error);
  }
};

export const userInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers["userId"];

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const findUser = await Auth.findById(userId);

    if (findUser) {
      res.status(200).json({ success: true, name: findUser?.name });
    } else {
      res.status(404).json({ success: false, message: "User Not Found." });
    }
  } catch (error) {
    next(error);
  }
};
