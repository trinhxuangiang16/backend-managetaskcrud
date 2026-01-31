import { responseSuccess } from "../common/helpers/function.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req);
      const response = responseSuccess(result, `register auth successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const result = await authService.login(req);
      const response = responseSuccess(result, `login auth successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async getInfo(req, res, next) {
    try {
      console.log("getinfo", req.user);
      const result = await authService.getInfo(req);
      const response = responseSuccess(result, `getInfo auth successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
  // đây là callback sau khi google auth xong. Trên FE chia 2 phân. 1 phân lây token, 1 phân lây thống tin user. Trên FE chia 2 phân. 1 phân lây token, 1 phân lây thống tin user
  async googleCallback(req, res, next) {
    try {
      const result = await authService.googleCallback(req);

      res.redirect(result);
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const result = await authService.refreshToken(req);
      const response = responseSuccess(result, `refresh token successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const result = await authService.create(req);
      const response = responseSuccess(result, `Create auth successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await authService.findAll(req);
      const response = responseSuccess(result, `Get all auths successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const result = await authService.findOne(req);
      const response = responseSuccess(
        result,
        `Get auth #${req.params.id} successfully`,
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const result = await authService.update(req);
      const response = responseSuccess(
        result,
        `Update auth #${req.params.id} successfully`,
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const result = await authService.remove(req);
      const response = responseSuccess(
        result,
        `Remove auth #${req.params.id} successfully`,
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
