"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const payment_controller_1 = require("../controllers/payment.controller");
const middleware_1 = require("../middleware");
router.post("/:id", middleware_1.VerifyTokenMiddleware, middleware_1.ValidateObjectId, payment_controller_1.createPaymentIntentController);
exports.default = router;
//# sourceMappingURL=payment.route.js.map