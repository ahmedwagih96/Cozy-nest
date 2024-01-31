"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImagesFromCloudinary = exports.uploadImagesToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImagesToCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const data = yield cloudinary_1.v2.uploader.upload(dataURI);
        return { url: data.secure_url, publicId: data.public_id };
    }
    catch (_a) {
        throw new Error("Internal Server Error");
    }
});
exports.uploadImagesToCloudinary = uploadImagesToCloudinary;
const deleteImagesFromCloudinary = (publicIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.api.delete_resources(publicIds);
        return result;
    }
    catch (error) {
        throw new Error("Internal Server Error");
    }
});
exports.deleteImagesFromCloudinary = deleteImagesFromCloudinary;
//# sourceMappingURL=cloudinary.js.map