import express from "express";
import userControllers from "../controllers/user/index";
import * as middleware from "../middleware/index";
import controllers from "../controllers/user/index";

const app = express.Router();

// Public auth routes
app.get("/user/signup/verify", controllers.auth.signup.verify);
app.post("/user/signup", userControllers.auth.signup.signup);

app.post("/user/login", userControllers.auth.login.login);

app.post("/user/reset/email", userControllers.auth.reset.sendEmail);
app.get("/user/reset/verify", userControllers.auth.reset.verify);
app.patch("/user/reset-pass", userControllers.auth.reset.resetPass);

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
