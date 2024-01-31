"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Photo Storage
const storage = multer_1.default.memoryStorage();
// Photo Upload Middleware
const MediaUploadMiddleware = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 megabyte
});
exports.default = MediaUploadMiddleware;
//# sourceMappingURL=mediaHandling.middleware.js.map