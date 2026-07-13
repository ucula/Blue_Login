import express from "express";
import { connectDB } from "../externals/db";
import configureMiddlewares from "../middleware/index";
import authRouter from "../routers/authRouter";
import adminRouter from "../routers/adminRouter";
import boxFormRouter from "../routers/boxFormRouter";

const app = express();

// Configure global middlewares
configureMiddlewares(app);

// Connect Database
connectDB();

// Routes
app.use("/api/1/admin", adminRouter);
app.use("/api/1/auth", authRouter);
app.use("/api/1/boxForm", boxFormRouter);

export default app;
