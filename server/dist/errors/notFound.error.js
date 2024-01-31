"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class NotFoundError extends _1.BaseError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.message = message;
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=notFound.error.js.map