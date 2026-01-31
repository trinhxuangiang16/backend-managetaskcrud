import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./images.router.js";
import userRouter from "./user.router.js";

const rootRouter = express.Router();

rootRouter.use("/image", imageRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

export default rootRouter;
