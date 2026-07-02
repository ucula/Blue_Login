// authRoutes.ts
import express from "express";
import controllers from "../controllers/index";
const app = express.Router();

// --- Signup flow ---
app.post("/auth/signup", controllers.auth.signup.signup);
app.get("/auth/signup/verify", controllers.auth.signup.verify);
app.post("/auth/signup/resend", controllers.base.sendEmail); // resend verification email

// --- Login ---
app.post("/auth/login", controllers.auth.login.login);

// --- Password reset flow ---
app.post("/auth/reset-password", controllers.auth.reset.sendEmail); // step 1: send reset email
app.get("/auth/reset-password/verify", controllers.auth.reset.verify); // step 2: verify token
app.patch("/auth/reset-password", controllers.auth.reset.reset); // step 3: actually reset

export default app;
