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
exports.createPaymentIntentController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const errors_1 = require("../errors");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createPaymentIntentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numberOfNights } = req.body;
    const hotelId = req.params.id;
    const hotel = yield hotel_model_1.default.findById(hotelId);
    if (!hotel) {
        throw new errors_1.NotFoundError("Hotel Not Found");
    }
    const totalCost = hotel.pricePerNight * Number(numberOfNights);
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "usd",
        metadata: {
            hotelId,
            userId: req.userId,
        },
    });
    if (!paymentIntent.client_secret) {
        throw new errors_1.BadRequestError("Error creating payment intent");
    }
    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
    };
    res.status(200).json(response);
});
exports.createPaymentIntentController = createPaymentIntentController;
//# sourceMappingURL=payment.controller.js.map