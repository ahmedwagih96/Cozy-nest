"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const NotFoundMiddleware = (req) => {
    throw new errors_1.NotFoundError(`Not found - ${req.originalUrl}`);
};
exports.default = NotFoundMiddleware;
//# sourceMappingURL=notFound.middleware.js.map