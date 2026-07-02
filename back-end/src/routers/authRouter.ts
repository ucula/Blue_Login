import express from "express";
import controllers from "../controllers/index";
import * as middleware from "../middleware/index";

const app = express.Router();

app.get("/users", middleware.auth, controllers.user.list);
app.get("/users/:id", middleware.auth, controllers.user.get);
app.post("/users", middleware.auth, controllers.user.post);
app.patch("/users/:id", middleware.auth, controllers.user.update);
app.delete("/users/:id", middleware.auth, controllers.user.del);

export default app;
