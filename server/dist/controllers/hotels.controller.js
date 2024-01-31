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
exports.getHotelsController = exports.getHotelController = void 0;
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const errors_1 = require("../errors");
const handleQueries_1 = require("../utils/handleQueries");
const getHotelsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // filtering
    const constructedQueries = (0, handleQueries_1.constructObjectQueries)(req.query);
    // Sorting
    const sort = (0, handleQueries_1.constructSorting)(req.query);
    // Pagination
    const pageSize = Number(req.query.limit) || 3;
    const page = parseInt(req.query.pageNumber ? req.query.pageNumber.toString() : "1");
    const skip = (page - 1) * pageSize;
    const hotels = yield hotel_model_1.default.find(constructedQueries)
        .sort(sort)
        .skip(skip)
        .limit(pageSize);
    const total = yield hotel_model_1.default.countDocuments(constructedQueries);
    const response = {
        hotels,
        pagination: { total, pages: Math.ceil(total / pageSize) },
    };
    res.status(200).json(response);
});
exports.getHotelsController = getHotelsController;
const getHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_model_1.default.findById(req.params.id);
    if (!hotel) {
        throw new errors_1.NotFoundError("Hotel Not Found");
    }
    res.status(200).json(hotel);
});
exports.getHotelController = getHotelController;
//# sourceMappingURL=hotels.controller.js.map