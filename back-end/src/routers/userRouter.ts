import express from "express";
import userControllers from "../controllers/user/index";
import * as middleware from "../middleware/index";

const app = express.Router();

// Public auth routes
app.post("/user/signup", userControllers.auth.signup);
app.post("/user/login", userControllers.auth.login);
app.post("/user/verify", userControllers.auth.verifyValue);
app.patch("/user/reset-pass", userControllers.auth.resetPass);

// Protected routes
app.get("/user", middleware.auth, userControllers.CRUD.getUser);
app.get("/user/:id", middleware.auth, userControllers.CRUD.getUserById);
app.post("/user", middleware.auth, userControllers.CRUD.createUser);
app.patch(
  "/user/:id/edit",
  middleware.auth,
  userControllers.CRUD.updateUserById,
);
app.delete("/user/:id", middleware.auth, userControllers.CRUD.deleteuserById);

export default app;
