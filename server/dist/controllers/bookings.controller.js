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
exports.getMyBookingsController = exports.createBookingController = void 0;
const booking_model_1 = __importDefault(require("../models/booking.model"));
const createBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = {
        user: req.userId,
        hotel: req.params.id,
        adultCount: Number(req.body.bookingDetails.adultCount),
        childCount: Number(req.body.bookingDetails.adultCount),
        checkIn: new Date(req.body.bookingDetails.checkIn),
        checkOut: new Date(req.body.bookingDetails.checkOut),
        totalCost: Number(req.body.totalCost),
    };
    const booking = new booking_model_1.default(newBooking);
    yield booking.save();
    res.status(200).send(booking);
});
exports.createBookingController = createBookingController;
const getMyBookingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.find({ user: req.userId })
        .populate("hotel")
        .sort("-createdAt");
    res.status(200).json(bookings);
});
exports.getMyBookingsController = getMyBookingsController;
//# sourceMappingURL=bookings.controller.js.map