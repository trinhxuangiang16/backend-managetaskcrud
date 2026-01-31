import jwt from "jsonwebtoken";
import { responseError } from "../helpers/function.helper.js";
import { statusCodes } from "./status-code.helper.js";
//Để ở cuối cùng để gom tấc cả các lõi trong dự án
export const appError = (err, req, res, next) => {
  console.log("Middleware đặc biệt, bắt lỗi", err.message);

  // Xử lý Multer errors
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    err.code = statusCodes.BAD_REQUEST; // 400
    err.message = `Unexpected field. Expected field name: "image"`;
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    err.code = statusCodes.BAD_REQUEST; // 400
    err.message = "File too large";
  }

  //Do err luôn luôn là class. nên lỗi jwt.JsonWebTokenError được quăng ra cũng là class và jwt.JsonWebTokenError đóng vai trò là 1 instance của err nên:
  if (err instanceof jwt.JsonWebTokenError) {
    err.code = statusCodes.UNAUTHORIZED; //401 => FE logout ng dùng
    //Đây là nhóm lỗi về token jwt.JsonWebTokenError
  }
  if (err instanceof jwt.TokenExpiredError) {
    err.code = statusCodes.FORBIDDEN; //403 => FE sẽ họi api/auth/refresh-token
  }

  //Kiểm tra xem code có undefine không. Nếu ko có thì giá trị statusCode sẽ về mặc định là 500
  console.log("code", err.code);
  const response = responseError(err?.message, err?.code, err?.stack);

  //Đây là redponse lỗi trả về FE
  res.status(response.statusCode).json(response);
};
