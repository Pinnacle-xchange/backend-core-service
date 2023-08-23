"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorController_1 = require("./controllers/errorController");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorController_2 = require("./controllers/errorController");
dotenv_1.default.config();
(0, db_1.default)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/users", userRoutes_1.default);
app.all("*", errorController_1.notFoundHadler);
app.use(errorController_2.globalErrorHandler);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
