"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.BaseError = void 0;
const base_error_1 = __importDefault(require("./base.error"));
exports.BaseError = base_error_1.default;
const badRequest_error_1 = __importDefault(require("./badRequest.error"));
exports.BadRequestError = badRequest_error_1.default;
const notFound_error_1 = __importDefault(require("./notFound.error"));
exports.NotFoundError = notFound_error_1.default;
const unauthenticated_error_1 = __importDefault(require("./unauthenticated.error"));
exports.UnauthorizedError = unauthenticated_error_1.default;
//# sourceMappingURL=index.js.map