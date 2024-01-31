"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const hotels_controller_1 = require("../controllers/hotels.controller");
const router = express_1.default.Router();
// Get All Hotels 
router.get("/", hotels_controller_1.getHotelsController);
// Get Single Hotel
router.get("/:id", middleware_1.ValidateObjectId, hotels_controller_1.getHotelController);
exports.default = router;
//# sourceMappingURL=hotels.route.js.map