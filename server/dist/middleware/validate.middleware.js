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
exports.ValidateUpdateHotel = exports.ValidateCreateHotel = exports.ValidateLoginUser = exports.ValidateUserRegistration = void 0;
const errors_1 = require("../errors");
const joi_1 = __importDefault(require("joi"));
const userRegistrationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
    confirmPassword: joi_1.default.string().min(8).required(),
});
const loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
const createHotelSchema = joi_1.default.object({
    name: joi_1.default.string().required().label("Name"),
    city: joi_1.default.string().required().label("City"),
    country: joi_1.default.string().required().label("Country"),
    description: joi_1.default.string().required().label("Description"),
    type: joi_1.default.string().required().label("Type"),
    pricePerNight: joi_1.default.number().required().label("Price Per Night"),
    adultCount: joi_1.default.number().required().label("Adult Count"),
    childCount: joi_1.default.number().required().label("Child Count"),
    starRating: joi_1.default.number().required().label("Star Rating"),
    facilities: joi_1.default.array().required().label("Facilities"),
});
const editHotelSchema = joi_1.default.object({
    name: joi_1.default.string().required().label("Name"),
    city: joi_1.default.string().required().label("City"),
    country: joi_1.default.string().required().label("Country"),
    description: joi_1.default.string().required().label("Description"),
    type: joi_1.default.string().required().label("Type"),
    pricePerNight: joi_1.default.number().required().label("Price Per Night"),
    adultCount: joi_1.default.number().required().label("Adult Count"),
    childCount: joi_1.default.number().required().label("Child Count"),
    starRating: joi_1.default.number().required().label("Star Rating"),
    facilities: joi_1.default.array().required().label("Facilities"),
    imageUrls: joi_1.default.array().required().label('Image Urls')
});
const validateWithJoi = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        const joiError = error;
        throw new errors_1.BadRequestError(joiError.details[0].message.replace(/["\\]/g, ""));
    }
});
const ValidateUserRegistration = validateWithJoi(userRegistrationSchema);
exports.ValidateUserRegistration = ValidateUserRegistration;
const ValidateLoginUser = validateWithJoi(loginUserSchema);
exports.ValidateLoginUser = ValidateLoginUser;
const ValidateCreateHotel = validateWithJoi(createHotelSchema);
exports.ValidateCreateHotel = ValidateCreateHotel;
const ValidateUpdateHotel = validateWithJoi(editHotelSchema);
exports.ValidateUpdateHotel = ValidateUpdateHotel;
//# sourceMappingURL=validate.middleware.js.map