import { tokenService } from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/contect.prisma.js";

export const protect = async (req, res, next) => {
  //header từ FE gửi lên
  const authorization = req.headers.authorization;
  console.log("🚀 ~ KIỂM TRA ~ protect ~ authorization:", authorization);

  //đăng nhập mới vào được
  if (!authorization) {
    throw new UnauthorizedException("Không có authorization");
  }

  //tách thành 2 giá trị và đổi thành mảng
  const [type, token] = authorization.split(" ");

  //Bearer mới vào đc
  if (type !== "Bearer") {
    throw new UnauthorizedException("Token không phải là Bearer");
  }

  //Ko có token ko vào đc
  if (!token) throw new UnauthorizedException("Không có Token");

  //Verify trong file tkenService
  const { userId } = tokenService.verifyAccessToken(token);

  //Verify ok thì check trong d có id này ko
  const userExist = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  //Ko có thì ko vào đc
  if (!userExist) {
    throw new UnauthorizedException("Không tìm thấy user");
  }

  //tạo key user trong res để truyền userExist vào res để dùng chung dữ liệu trong api get info, tức là trong hàm getinfo lấy đc gí trị userExist
  req.user = userExist;

  console.log({ authorization, type, token, userId, userExist });
  console.log("mid protect");

  next();
};
