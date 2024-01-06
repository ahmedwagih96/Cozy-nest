import multer from "multer";

// Photo Storage
const storage = multer.memoryStorage();

// Photo Upload Middleware
const MediaUploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 megabyte
});

export default MediaUploadMiddleware;
