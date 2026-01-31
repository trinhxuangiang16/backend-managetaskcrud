import multer from "multer";

import fs from "fs";
import path from "path"; // Thư viện path để xử lý đường dẫn file
import { FOLDER_IMAGE } from "../constant/app.contant.js";
// Tạo thư mục lưu trữ nếu chưa tồn tại

fs.mkdirSync(FOLDER_IMAGE, { recursive: true }); // tạo thư mục images nếu chưa có trong hệ thống. recursive SẼ TẠO NẾU CHƯA TỒN TẠI. CÒN NẾU TỒN TẠI RỒI THÌ KHÔNG BỊ LỖI

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //req, file, cb lần lượt là request, file upload, callback. file là thông tin file
    cb(null, FOLDER_IMAGE);
  },
  //Đây là chỗ đặt tên file
  filename: function (req, file, cb) {
    console.log("🚀 ~ KIỂM TRA ~ file:", file);
    const extname = path.extname(file.originalname); //lấy phần mở rộng của file gốc. Ví dụ: .jpg, .png

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filename = "local" + "-" + uniqueSuffix + extname;
    console.log("🚀 ~ KIỂM TRA ~ filename:", filename);

    cb(null, filename); //avatar-123456789
  },
});

export const uploadDiskStorage = multer({ storage: storage });
