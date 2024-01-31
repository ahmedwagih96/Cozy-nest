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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotelController = exports.getMyHotelController = exports.getMyHotelsController = exports.createHotelController = void 0;
const cloudinary_1 = require("../utils/cloudinary");
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const errors_1 = require("../errors");
const createHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageFiles = req.files;
    if (!imageFiles.length) {
        throw new errors_1.BadRequestError("Images are Required");
    }
    // upload images to cloudinary
    const uploadPromises = imageFiles.map((image) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, cloudinary_1.uploadImagesToCloudinary)(image);
        return res;
    }));
    const images = yield Promise.all(uploadPromises);
    // Create New Hotel
    const newHotel = req.body;
    newHotel.imageUrls = images;
    newHotel.user = req.userId;
    const hotel = new hotel_model_1.default(newHotel);
    yield hotel.save();
    // response to client
    res.status(201).json(hotel);
});
exports.createHotelController = createHotelController;
const getMyHotelsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotels = yield hotel_model_1.default.find({ user: req.userId });
    res.status(200).json(hotels);
});
exports.getMyHotelsController = getMyHotelsController;
const getMyHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = req.hotel;
    res.status(200).json(hotel);
});
exports.getMyHotelController = getMyHotelController;
const updateHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedHotel = req.body;
    const currentHotel = req.hotel;
    // Check if images uploaded to cloudinary is to be deleted
    const deletedImages = currentHotel.imageUrls.filter((image) => !updatedHotel.imageUrls.some((newImage) => newImage.publicId === image.publicId));
    if (deletedImages.length) {
        const publicIds = deletedImages.map((image) => image.publicId);
        yield (0, cloudinary_1.deleteImagesFromCloudinary)(publicIds);
    }
    // check if new images is added
    const imageFiles = req.files;
    if (imageFiles && imageFiles.length) {
        // upload images to cloudinary
        const uploadPromises = imageFiles.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, cloudinary_1.uploadImagesToCloudinary)(image);
            return res;
        }));
        const newImages = yield Promise.all(uploadPromises);
        updatedHotel.imageUrls = [...newImages, ...(updatedHotel.imageUrls || [])];
    }
    // update the hotel
    const hotel = yield hotel_model_1.default.findByIdAndUpdate(req.params.id, updatedHotel, {
        new: true,
    });
    res.status(200).json(hotel);
});
exports.updateHotelController = updateHotelController;
//# sourceMappingURL=myHotels.controller.js.map