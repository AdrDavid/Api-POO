import { Router } from "express";
import { AuthController } from "../src/Controller/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.post("/registro", authController.registro);
authRouter.get("/all", authController.getAll);

export { authRouter };
