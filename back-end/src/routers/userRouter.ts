import express from "express";
import userControllers from "../controllers/user/index";
import { requireAuth } from "../middleware/auth";

const app = express.Router();

// Public auth routes
app.post("/user/signup", userControllers.signup);
app.post("/user/login", userControllers.login);
app.post("/user/verify-email", userControllers.verifyEmail);
app.patch("/user/reset-pass", userControllers.resetPass);

// Protected routes
app.get("/user", requireAuth, userControllers.getUser);
app.get("/user/:id", requireAuth, userControllers.getUserById);
app.post("/user", requireAuth, userControllers.createUser);
app.patch("/user/:id", requireAuth, userControllers.updateUserById);
app.delete("/user/:id", requireAuth, userControllers.deleteuserById);

export default app;

