import express from "express";
import { userController } from "../controllers/user-controller";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").isString().isLength({ min: 3, max: 32 }),
  userController.register
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.delete("/users", authMiddleware, userController.deleteUser);

export default router;
