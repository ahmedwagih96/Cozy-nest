"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const myHotels_controller_1 = require("../controllers/myHotels.controller");
const router = express_1.default.Router();
// Create Hotel
router.post("/", middleware_1.VerifyTokenMiddleware, middleware_1.MediaUploadMiddleware.array("imageFiles", 6), middleware_1.ValidateCreateHotel, myHotels_controller_1.createHotelController);
// Get All My Hotels
router.get("/", middleware_1.VerifyTokenMiddleware, myHotels_controller_1.getMyHotelsController);
//  Get My Single Hotel
router.get("/:id", middleware_1.VerifyHotelOwnership, middleware_1.ValidateObjectId, myHotels_controller_1.getMyHotelController);
// Update My Hotel
router.put("/:id", middleware_1.VerifyHotelOwnership, middleware_1.ValidateObjectId, middleware_1.MediaUploadMiddleware.array("imageFiles"), middleware_1.ValidateUpdateHotel, myHotels_controller_1.updateHotelController);
exports.default = router;
//# sourceMappingURL=myHotels.route.js.map