"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHadler = exports.globalErrorHandler = void 0;
const customError_1 = require("../utils/customError");
const devErrors = (res, err) => {
    if (err instanceof customError_1.CustomError) {
        res.status(err.statusCode).json({
            error: err.message,
            statusCode: err.statusCode,
            stackTrace: err.stack,
            err: err,
        });
    }
    else {
        res.status(500).json({
            error: err.message,
            statusCode: 500,
            stackTrace: err.stack,
            err: err,
        });
    }
};
const prodErrors = (res, err) => {
    if (err instanceof customError_1.CustomError) {
        res.status(err.statusCode).json({
            error: err.message,
            statusCode: err.statusCode,
        });
    }
    else {
        res.status(500).json({
            error: "Something went wrong! Please try again later.",
            statusCode: 500,
        });
    }
};
const validationHandler = (err) => {
    return new customError_1.CustomError(err.message, 400);
};
const globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        if (err.name === "ValidationError")
            err = validationHandler(err);
        devErrors(res, err);
    }
    else if (process.env.NODE_ENV === "production") {
        if (err.name === "ValidationError")
            err = validationHandler(err);
        prodErrors(res, err);
    }
};
exports.globalErrorHandler = globalErrorHandler;
const notFoundHadler = (req, res, next) => {
    const error = new customError_1.CustomError(`Not Found - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFoundHadler = notFoundHadler;
