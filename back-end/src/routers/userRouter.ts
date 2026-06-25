import express from "express";
import controllers from "../controllers/index";
import * as middleware from "../middleware/index";

const app = express.Router();

// Public auth routes
app.get("/user/signup/verify", controllers.auth.signup.verify);
app.post("/user/signup", controllers.auth.signup.useSignup);

app.post("/user/login", controllers.auth.login.useLogin);

app.post("/user/reset/email", controllers.auth.reset.sendEmail);
app.get("/user/reset/verify", controllers.auth.reset.verify);
app.patch("/user/reset-pass", controllers.auth.reset.useReset);

// Protected routes
app.get("/user", middleware.auth, controllers.user.list);
app.get("/user/:id", middleware.auth, controllers.user.get);
app.post("/user", middleware.auth, controllers.user.post);
app.patch("/user/:id/edit", middleware.auth, controllers.user.update);
app.delete("/user/:id", middleware.auth, controllers.user.del);

export default app;
