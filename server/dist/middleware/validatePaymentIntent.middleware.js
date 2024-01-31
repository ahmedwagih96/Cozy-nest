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
const stripe_1 = __importDefault(require("stripe"));
const errors_1 = require("../errors");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const ValidatePaymentIntent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
        throw new errors_1.BadRequestError("payment intent not found");
    }
    if (paymentIntent.metadata.hotelId !== req.params.id ||
        paymentIntent.metadata.userId !== req.userId) {
        throw new errors_1.UnauthorizedError("Payment Intent mismatch");
    }
    if (paymentIntent.status !== "succeeded") {
        throw new errors_1.BadRequestError(`payment intent not succeeded. Status: ${paymentIntent.status}`);
    }
    next();
});
exports.default = ValidatePaymentIntent;
//# sourceMappingURL=validatePaymentIntent.middleware.js.map