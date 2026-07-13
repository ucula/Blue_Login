// authRoutes.ts
import express from "express";
import controllers from "../controllers/index";
const app = express.Router();

// --- Signup flow ---
// GET
app.get("/signup/verify", controllers.auth.signupVerify);

// POST
app.post("/signup", controllers.auth.signup);

// --- Login ---
app.post("/login", controllers.auth.login);

// --- Password reset flow ---
// GET
app.get("/reset/verify", controllers.auth.resetVerify);

// PATCH
app.patch("/reset", controllers.auth.reset);

export default app;
