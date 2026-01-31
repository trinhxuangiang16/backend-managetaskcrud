import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//npm install passport-google-oauth20
//var GoogleStrategy = require("passport-google-oauth20").Strategy; dòng này lấy về từ thư viện và đổi  về như phía trên. .Stratagy tức là cái phía trước là object vậy mình sẽ import nó từ dòng trước. CÒn GoogleStrategy là tên biên đc đặt sau khi lấy ra

import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constant/app.contant.js";
import { BadRequestException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/contsct.prisma.js";

//phải chạy trước mọi api về login. Chạy trước để khởi tạo 1 lần để khi dùng lấy ra nhanh
export const initGoogleStrategy = () => {
  //npm i passport
  passport.use(
    new GoogleStrategy(
      //làm việc với gg
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google-callback",
      },
      //xử lý nội bộ
      async function (accessToken, refreshToken, profile, cb) {
        console.dir(
          {
            accessToken,
            refreshToken,
            profile,
          },
          { colors: true, depth: null },
        );

        const email = profile.emails[0].value;
        const isVerified = profile.emails[0].verified;
        const fullName = profile.displayName;
        const googleId = profile.id;
        const avatar = profile.photos[0].value;

        console.log({ email, isVerified, fullName, googleId, avatar });

        if (!isVerified) {
          //thất bại
          cb(new BadRequestException("Email isVerified failed"), null);

          return;
        }

        const userExist = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });

        //Nếu mà ko có tk thì tạo mới
        //Sẽ luôn luôn cho ng dùng đăng nhập
        //Vì bên phía gg đã hỗ trợ xác thực
        if (!userExist) {
          await prisma.users.create({
            data: {
              email: email,
              avatar: avatar,
              googleId: googleId,
              fullName: fullName,
            },
          });
        }

        //thành công
        //hàm cb => tham số thứ 3 gắn vào key user của obj req

        cb(null, userExist);
        //chức nằng này giống req.user = userExist
        //Bên midlleware nhận được là req.user và key user không đổi, luôn luôn là user dù có thay userExist bang92 string hay gì đó
      },
    ),
  );
};
