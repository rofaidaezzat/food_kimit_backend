import { Router } from "express";
import UserController from "../controller/UserController";

const authRouter = Router();
const controller = new UserController();

// POST /api/v1/auth/login
authRouter.post("/login", controller.loginUser);

export default authRouter;