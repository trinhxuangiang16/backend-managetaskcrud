import bcrypt from "bcrypt";
import {
  BadRequestException,
  UnauthorizedException,
} from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/contect.prisma.js";
import { tokenService } from "./token.service.js";

export const authService = {
  async register(req) {
    const { email, password, fullname } = req.body;
    console.log("🚀 ~ KIỂM TRA ~ req.body:", req.body);

    const userExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const hashPassword = bcrypt.hashSync(password, 10);

    if (userExist)
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập",
      );

    const userNew = await prisma.users.create({
      data: {
        email: email,
        passWord: hashPassword,
        fullName: fullname,
      },
    });

    return true;
  },

  async login(req) {
    const { email, password } = req.body;
    console.log("🚀 ~ KIỂM TRA ~ req.body:", req.body);

    const userExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    console.log("🚀 ~ User found:", {
      id: userExist?.id,
      email: userExist?.email,
      hasPassword: !!userExist?.passWord,
      passwordFromDB: userExist?.passWord, // Log này để debug
    });

    if (!userExist) {
      throw new BadRequestException("Xin vui lòng đăng kí trước khi đăng nhập");
    }

    if (!userExist.passWord) {
      throw new BadRequestException("Tài khoản chưa có mật khẩu");
    }

    const isPassword = bcrypt.compareSync(password, userExist.passWord);
    console.log("🚀 ~ Password match:", isPassword);

    if (!isPassword) {
      throw new BadRequestException("Mật khẩu chưa chính xác");
    }

    const tokens = tokenService.createTokens(userExist.id);

    return tokens;
  },

  async getInfo(req) {
    delete req.user.passWord;
    return req.user;
  },

  async refreshToken(req) {
    const { accessToken, refreshToken } = req.body;

    const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });

    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

    if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
      throw new UnauthorizedException("Refresh token invalid");
    }

    const userExist = await prisma.users.findUnique({
      where: { id: decodeRefreshToken.userId },
    });

    if (!userExist) {
      throw new UnauthorizedException("User not found");
    }

    const tokens = tokenService.createTokens(userExist.id);
    console.log("🚀 ~ KIỂM TRA ~ tokens:", tokens);

    return tokens;
  },

  async create(req) {
    return `This action create`;
  },

  async findAll(req) {
    return `This action returns all auth`;
  },

  async findOne(req) {
    return `This action returns a id: ${req.params.id} auth`;
  },

  async update(req) {
    return `This action updates a id: ${req.params.id} auth`;
  },

  async remove(req) {
    return `This action removes a id: ${req.params.id} auth`;
  },
};
