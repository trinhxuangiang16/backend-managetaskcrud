import express from "express";

import { protect } from "../common/middleware/protect.middleware.js";
import { authController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.get("/get-info", protect, authController.getInfo);

authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
