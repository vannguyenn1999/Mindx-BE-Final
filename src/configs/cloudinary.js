import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// 1. Cấu hình SDK
cloudinary.config({
  cloud_name: "dinhquanghuy",
  api_key: "713732583835668",
  api_secret: "9n2l8sXo7m1a3e5ZtqjK8b9vVg",
});

// 2. Cấu hình Storage để upload trực tiếp lên Cloudinary
const store = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WebMovie_Uploads/TEST", // Thư mục trên Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"], // Định dạng cho phép
    public_id: (req, file) => {
      // Tùy chỉnh public_id: dùng tên từ req.body.filename hoặc tên file gốc
      const customName =
        req.body.filename ||
        req.body.fileName ||
        file.originalname.split(".")[0].trim().replaceAll(" ", "_");
      console.log("customName customName : ", customName);
      return `${customName}-${Date.now()}`;
    },
    resource_type: "auto",
  },
});

export const uploadCloud = multer({ storage: store });
export { cloudinary };
