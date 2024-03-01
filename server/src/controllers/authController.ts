import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Auth from "../models/authModel";

interface InputSignin {
  username: string;
  password: string;
}

interface InputSignup extends InputSignin {
  name: string;
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputs: InputSignup = req.body;

    const registeredUser = await Auth.findOne({
      username: inputs.username,
    });

    if (registeredUser) {
      res
        .status(400)
        .send({ success: false, message: "User Already Registered." });
    } else {
      const newUser = new Auth({
        name: inputs.name,
        username: inputs.username,
      });

      newUser.password = await newUser.generateHash(inputs.password);

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
    const inputs: InputSignin = req.body;

    const findUser = await Auth.findOne({
      username: inputs.username,
    });


    if (findUser) {
      const isValidPassword = await findUser.validatePassword(inputs.password);

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
