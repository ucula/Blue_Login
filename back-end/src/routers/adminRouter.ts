import express from "express";
import controllers from "../controllers/index";
import * as middleware from "../middleware/index";
import { sendEmail } from "@/controllers/admin";

const app = express.Router();

// GET
app.get("/users", middleware.adminAuth, controllers.admin.list);
app.get("/users/:id", middleware.adminAuth, controllers.admin.get);

// POST
app.post("/users", middleware.adminAuth, controllers.admin.post);

// PATCH
app.patch("/users/:id", middleware.adminAuth, controllers.admin.update);

// DELETE
app.delete("/users/:id", middleware.adminAuth, controllers.admin.del);

// --- Extra ---
app.post("/users/email/:id", sendEmail);
export default app;
