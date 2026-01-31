import "dotenv/config";
//dotenv đã đc cài sẵn trong prisma

export const DATABASE_URL = process.env.DATABASE_URL;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

export const FOLDER_IMAGE = "public/images";
export const FOLDER_AVATAR = "public/avatars";

console.log(
  "\n",
  {
    DATABASE_URL: DATABASE_URL,
    ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
    CLOUDINARY_NAME: CLOUDINARY_NAME,
    CLOUDINARY_KEY: CLOUDINARY_KEY,
    CLOUDINARY_SECRET: CLOUDINARY_SECRET,
    FOLDER_IMAGE: FOLDER_IMAGE,
    FOLDER_AVATAR: FOLDER_AVATAR,
  },
  "\n",
);
