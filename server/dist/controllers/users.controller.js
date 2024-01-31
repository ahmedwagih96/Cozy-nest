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
exports.registerUserController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = require("../errors");
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.default.findOne({ email: req.body.email });
    if (user) {
        throw new errors_1.BadRequestError("User already exists");
    }
    user = new user_model_1.default(req.body);
    yield user.save();
    const token = user.generateAuthToken();
    user = yield user_model_1.default.findOne({ email: req.body.email });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 1000,
    });
    return res.status(200).json(user);
});
exports.registerUserController = registerUserController;
//# sourceMappingURL=users.controller.js.map