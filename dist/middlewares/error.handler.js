"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormErrorHandler = exports.boomErrorHandler = exports.errorHandler = exports.logError = void 0;
const mongoose_1 = require("mongoose");
function logError(err, req, res, next) {
    console.error(err);
    next(err);
}
exports.logError = logError;
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
        return;
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
function ormErrorHandler(err, req, res, next) {
    if (err instanceof mongoose_1.MongooseError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.message
        });
    }
    next(err);
}
exports.ormErrorHandler = ormErrorHandler;
