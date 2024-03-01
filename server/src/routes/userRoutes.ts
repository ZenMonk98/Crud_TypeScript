import express from "express";
import { sign } from "jsonwebtoken";

// auth controllers
import { signin, userInfo } from "../controllers/authController";
import { signup } from "../controllers/authController";

// // user controllers
import { getUsers } from "../controllers/userController";
import { addUser } from "../controllers/userController";
import { updateUser } from "../controllers/userController";
import { deleteUser } from "../controllers/userController";

// authMiddleware
import { authmiddleWare } from "../middlewares/authMiddleware";

const Router = express.Router();

// authentication routes
Router.post("/user/signup", signup);
Router.post("/user/signin", signin);
Router.get("/me", authmiddleWare, userInfo);

// user routes
Router.get("/get/user", authmiddleWare, getUsers);
Router.post("/add/user", authmiddleWare, addUser);
Router.patch("/update/user/:userId", authmiddleWare, updateUser);
Router.delete("/delete/user/:userId", authmiddleWare, deleteUser);

export { Router as userRouter };
