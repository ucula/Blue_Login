import express from "express";
import controllers from "../controllers/user/index";

const router = express.Router();

router.get("/", controllers.getUser);
router.get("/:id", controllers.getUserById);
router.post("/", controllers.createUser);
router.post("/", controllers.createUser);
router.patch("/:id", controllers.updateUserById);
router.delete("/:id", controllers.deleteuserById);

export default router;
