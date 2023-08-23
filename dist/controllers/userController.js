"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("./helpers/generateToken"));
const customError_1 = require("../utils/customError");
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const registerUser = (0, asyncErrorHandler_1.default)(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        throw new customError_1.CustomError("User already exist", 400);
    }
    const user = await User_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    throw new customError_1.CustomError(" Invlaid User Details", 400);
});
exports.registerUser = registerUser;
const loginUser = (0, asyncErrorHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user && user.matchPassword(password)) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email,
        });
    }
    else {
        res.status(401);
        throw new customError_1.CustomError("Invalid email or password", 400);
    }
});
exports.loginUser = loginUser;
const getUser = (0, asyncErrorHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findById(req.userId).select("-password");
    res.status(200).json(user);
});
exports.getUser = getUser;
