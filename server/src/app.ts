import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// routes
import { userRouter } from "./routes/userRoutes";

// configuring dotenv
dotenv.config();

export const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using routes
app.use("/api/v1", userRouter);

app.use(errorMiddleware);
