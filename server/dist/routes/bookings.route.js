"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookings_controller_1 = require("../controllers/bookings.controller");
const middleware_1 = require("../middleware");
router.get("/", middleware_1.VerifyTokenMiddleware, bookings_controller_1.getMyBookingsController);
router.post("/:id", middleware_1.VerifyTokenMiddleware, middleware_1.ValidateObjectId, middleware_1.ValidatePaymentIntent, bookings_controller_1.createBookingController);
exports.default = router;
//# sourceMappingURL=bookings.route.js.map