"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/login", middleware_1.ValidateLoginUser, auth_controller_1.loginUserController);
router.get("/validate-token", middleware_1.VerifyTokenMiddleware, auth_controller_1.validateTokenController);
router.get("/logout", middleware_1.VerifyTokenMiddleware, auth_controller_1.logOutController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map