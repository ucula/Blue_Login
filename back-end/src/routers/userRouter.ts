import express from "express";
import userControllers from "../controllers/user/index";
import { requireAuth } from "../middleware/auth";

const app = express.Router();

// Public auth routes
app.post("/user/signup", userControllers.auth.signup);
app.post("/user/login", userControllers.auth.login);
app.post("/user/verify-email", userControllers.auth.verifyEmail);
app.patch("/user/reset-pass", userControllers.auth.resetPass);

// Protected routes
app.get("/user", requireAuth, userControllers.CRUD.getUser);
app.get("/user/:id", requireAuth, userControllers.CRUD.getUserById);
app.post("/user", requireAuth, userControllers.CRUD.createUser);
app.patch("/user/:id", requireAuth, userControllers.CRUD.updateUserById);
app.delete("/user/:id", requireAuth, userControllers.CRUD.deleteuserById);

export default app;
