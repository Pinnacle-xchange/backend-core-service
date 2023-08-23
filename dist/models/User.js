"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required field"],
        trim: true,
        validate: [validator_1.default.isAlpha, "Name should only contain alphabeths"],
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            },
            message: "Email is invalid",
        },
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
            },
            message: "Password must be at least 8-32 characters and include at least a lowercase, uppercase and a special character",
        },
        required: true,
        trim: true,
    },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
