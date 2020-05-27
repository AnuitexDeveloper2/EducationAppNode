"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    console.log('we are here');
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
        status,
        message,
    });
    next();
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map