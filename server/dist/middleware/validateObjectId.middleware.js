"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
const ValidateObjectId = (req, res, next) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        throw new errors_1.BadRequestError("Invalid Id");
    }
    next();
};
exports.default = ValidateObjectId;
//# sourceMappingURL=validateObjectId.middleware.js.map