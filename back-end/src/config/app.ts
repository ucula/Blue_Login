import express from "express";
import { connectDB } from "../externals/db";
import { configureMiddlewares } from "../middleware/index";
import userRouter from "../routers/userRouter";

const app = express();

// Configure global middlewares
configureMiddlewares(app);

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRouter);

export default app;
