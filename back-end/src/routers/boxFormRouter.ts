import express from "express";
import controllers from "../controllers/index";
import * as middleware from "../middleware/index";

const app = express.Router();

app.get("/box", middleware.userAuth, controllers.boxForm.get);
app.post("/box", middleware.userAuth, controllers.boxForm.save);

export default app;
