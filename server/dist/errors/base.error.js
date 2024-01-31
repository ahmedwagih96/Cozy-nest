"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}
exports.default = BaseError;
//# sourceMappingURL=base.error.js.map