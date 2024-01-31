"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class UnauthorizedError extends _1.BaseError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.message = message;
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=unauthenticated.error.js.map