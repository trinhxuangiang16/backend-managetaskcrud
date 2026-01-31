import { responseSuccess } from "../common/helpers/function.helper.js";
import { imageService } from "../services/image.service.js";

export const imageController = {
  async createImage(req, res, next) {
    const result = await imageService.createImage(req);
    const response = responseSuccess(result, `Create image successfully`);
    res.status(response.statusCode).json(response);
  },
};
