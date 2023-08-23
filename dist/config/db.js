"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        const connect = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${connect.connection.host}`);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
}
exports.default = connectDB;
