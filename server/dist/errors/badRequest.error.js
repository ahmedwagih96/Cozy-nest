"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class BadRequestError extends _1.BaseError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.message = message;
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=badRequest.error.js.map