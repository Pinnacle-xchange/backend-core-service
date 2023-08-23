"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const customError_1 = require("../utils/customError");
const protect = (0, asyncErrorHandler_1.default)(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            req.userId = userId;
            next();
        }
        catch (error) {
            throw new customError_1.CustomError("Not authorized, invalid token", 401);
        }
    }
    else {
        throw new customError_1.CustomError("Not authorized, no token", 401);
    }
});
exports.protect = protect;
