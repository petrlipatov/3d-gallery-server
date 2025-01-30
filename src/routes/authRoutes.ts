import express from "express";
import { UserController } from "../controllers/user-controller";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);

export default router;
