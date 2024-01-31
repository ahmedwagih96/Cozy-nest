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
exports.VerifyHotelOwnership = exports.VerifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const VerifyTokenMiddleware = (req, res, next) => {
    const token = req.cookies["jwt"];
    if (!token) {
        throw new errors_1.UnauthorizedError("Access Denied");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        throw new errors_1.UnauthorizedError("Access Denied");
    }
};
exports.VerifyTokenMiddleware = VerifyTokenMiddleware;
const VerifyHotelOwnership = (req, res, next) => {
    VerifyTokenMiddleware(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const hotel = yield hotel_model_1.default.findById(req.params.id);
        if (!hotel) {
            throw new errors_1.NotFoundError("Hotel Not Found");
        }
        if (hotel.user.toString() !== req.userId) {
            throw new errors_1.UnauthorizedError("Access Denied");
        }
        req.hotel = hotel;
        next();
    }));
};
exports.VerifyHotelOwnership = VerifyHotelOwnership;
//# sourceMappingURL=authentication.middleware.js.map