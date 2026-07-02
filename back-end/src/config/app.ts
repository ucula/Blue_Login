import express from "express";
import { connectDB } from "../externals/db";
import configureMiddlewares from "../middleware/index";
import userRouter from "../routers/userRouter";
import authRouter from "../routers/authRouter";

const app = express();

// Configure global middlewares
configureMiddlewares(app);

// Connect Database
connectDB();

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

export default app;
