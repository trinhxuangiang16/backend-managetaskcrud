import jsonWebToken from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.contant.js";

//xử lý về token
export const tokenService = {
  createTokens(userId) {
    const accessToken = jsonWebToken.sign(
      { userId: userId },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10d",
      },
    );

    const refreshToken = jsonWebToken.sign(
      { userId: userId },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "11d",
      },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },

  verifyAccessToken(accessToken, option) {
    const decode = jsonWebToken.verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
      option,
    ); //option: ignoreExpiration. Ngăn không kiểm tra hết hạn

    return decode;
  },

  verifyRefreshToken(refreshToken) {
    const decode = jsonWebToken.verify(refreshToken, REFRESH_TOKEN_SECRET);

    return decode;
  },
};
