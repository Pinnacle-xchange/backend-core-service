import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { notFoundHadler } from "./controllers/errorController";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./controllers/errorController";

dotenv.config();
connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

app.all("*", notFoundHadler);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
