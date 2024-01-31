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
exports.logOutController = exports.validateTokenController = exports.loginUserController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = require("../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new errors_1.UnauthorizedError("Invalid Credentials");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new errors_1.UnauthorizedError("Invalid Credentials");
    }
    const token = user.generateAuthToken();
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 1000,
    });
    user = yield user_model_1.default.findOne({ email });
    return res.status(200).json(user);
});
exports.loginUserController = loginUserController;
const validateTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.userId);
    if (!user) {
        throw new errors_1.NotFoundError("User Not Found");
    }
    const token = user.generateAuthToken();
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 1000,
    });
    res.status(200).send(user);
});
exports.validateTokenController = validateTokenController;
const logOutController = (req, res) => {
    return res
        .clearCookie("jwt", { httpOnly: true, secure: true })
        .status(200)
        .json({ message: "User logged out successfully" });
};
exports.logOutController = logOutController;
//# sourceMappingURL=auth.controller.js.map