import express from "express";
import userControllers from "../controllers/user/index";

const router = express.Router();

router.get("/user", userControllers.getUser);
router.get("/user/:id", userControllers.getUserById);
router.post("/user", userControllers.createUser);
router.patch("/user/:id", userControllers.updateUserById);
router.delete("/user/:id", userControllers.deleteuserById);

router.post("/user/check-dupe", userControllers.checkDupe);

export default router;
