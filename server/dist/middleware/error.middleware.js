"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const ErrorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.BaseError) {
        return res.status(err.statusCode).send({ message: err.message });
    }
    return res.status(res.statusCode ? res.statusCode : 500).send({
        message: err.message ? err.message : "Something went wrong. Please try again later",
    });
};
exports.default = ErrorHandlerMiddleware;
//# sourceMappingURL=error.middleware.js.map