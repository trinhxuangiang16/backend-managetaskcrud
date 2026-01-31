import express from "express";
import { protect } from "../common/middleware/protect.middleware.js";
import { uploadMemory } from "../common/multer/memory.multer.js";
import { imageController } from "../controllers/image.controller.js";
const imageRouter = express.Router();

// Upload image post
imageRouter.post(
  "/create",
  protect,
  uploadMemory.single("image"),
  imageController.createImage,
);

export default imageRouter;
