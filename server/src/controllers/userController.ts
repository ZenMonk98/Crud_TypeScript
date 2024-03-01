import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import mongoose from "mongoose";

interface IUserInputs {
  name: string;
  email: string;
  age: string;
}

// Getting Users List
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userList = await User.find();

    if (userList.length > 0) {
      res.status(200).json({ success: true, users: userList });
    } else {
      res.status(204).json({ success: false, message: "No users Found." });
    }
  } catch (error) {
    next(error);
  }
};

// Creating User
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputs: IUserInputs = req.body;

    // Check if user already Exists
    const user = await User.findOne({ email: inputs.email });

    if (user) {
      res.status(400).json({ success: false, message: "User Already Exists." });
    } else {
      const newUser = new User({
        name: inputs.name,
        email: inputs.email,
        age: inputs.age,
      });

      await newUser.save();

      res.status(200).json({
        success: true,
        message: "User created Successfully.",
        user: newUser.name,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Updating User Info
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // Checking if the Id is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId.",
      });
    }

    const inputs: IUserInputs = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: inputs.name,
        email: inputs.email,
        age: inputs.age,
      },
      { new: true }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ success: true, message: "User Updated Successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    next(error);
  }
};

// Deleting User
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // Checking if the Id is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId, { new: true });

    if (deletedUser) {
      res
        .status(200)
        .json({ success: true, message: "User has been deleted." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    next(error);
  }
};
