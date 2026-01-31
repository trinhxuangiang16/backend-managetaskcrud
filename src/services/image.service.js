import cloudinary from "../common/cloudinary/cloudinary.js";
import { FOLDER_IMAGE } from "../common/constant/app.contant.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/contect.prisma.js";

export const imageService = {
  async createImage(req) {
    if (!req.file) {
      throw new BadRequestException("No file uploaded");
    }
    console.log(req.file);

    const { title, description } = req.body;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: FOLDER_IMAGE }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(req.file.buffer);
    });

    // LƯU DB
    const newImage = await prisma.images.create({
      data: {
        title: title || null,
        description: description || null,
        imageUrl: uploadResult.public_id,
        userId: req.user.id,
      },
    });

    return newImage;
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
