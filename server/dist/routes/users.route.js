"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post("/register", middleware_1.ValidateUserRegistration, users_controller_1.registerUserController);
exports.default = router;
//# sourceMappingURL=users.route.js.map