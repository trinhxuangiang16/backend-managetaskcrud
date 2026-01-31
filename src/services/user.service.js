import fs from "fs";
import path from "path";
import cloudinary from "../common/cloudinary/cloudinary.js";
import { FOLDER_AVATAR } from "../common/constant/app.contant.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/contect.prisma.js";

export const userService = {
  async avatarLocal(req) {
    // req.file is the `avatar` file
    console.log("🚀 ~ KIỂM TRA ~ req.file:", req.file);

    if (!req.file) {
      throw new BadRequestException("No file uploaded");
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        avatar: req.file.filename,
      },
    });
    // req.body will hold the text fields, if there were any
    // Xóa ảnh cũ
    if (req.user.avatar) {
      const oldPath = path.join(FOLDER_AVATAR, req.user.avatar);

      // Kiểm tra file local trước
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // ← XÓA LOCAL
      } else {
        // Nếu không tồn tại local, coi nó là Cloud public_id
        await cloudinary.uploader.destroy(req.user.avatar); // ← XÓA CLOUD
      }
    }

    return true;
  },
  async avatarCloud(req) {
    console.log("🚀 ~ KIỂM TRA ~ req.file:", req.file);

    if (!req.file) {
      throw new BadRequestException("No file uploaded");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: FOLDER_AVATAR }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });
    console.log("🚀 ~ KIỂM TRA ~ uploadResult:", uploadResult);

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        avatar: uploadResult.public_id,
      },
    });

    // Xóa ảnh cũ
    if (req.user.avatar) {
      const oldPath = path.join(FOLDER_AVATAR, req.user.avatar);

      // Kiểm tra file local trước
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      } else {
        // Nếu không tồn tại local, coi nó là Cloud public_id
        try {
          await cloudinary.uploader.destroy(req.user.avatar);
        } catch (error) {
          console.error("Lỗi xóa Cloudinary:", error);
          // Không throw error, chỉ log
        }
      }
    }

    return true;
  },
  async create(req) {
    return `This action create`;
  },
  async findAll(req) {
    return `This action returns all user`;
  },

  async findOne(req) {
    return `This action returns a id: ${req.params.id} user`;
  },

  async update(req) {
    return `This action updates a id: ${req.params.id} user`;
  },

  async remove(req) {
    return `This action removes a id: ${req.params.id} user`;
  },
};
