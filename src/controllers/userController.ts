import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import generateToken from "./helpers/generateToken";
import { CustomError } from "../utils/customError";
import asyncErrorHandler from "../utils/asyncErrorHandler";

const registerUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new CustomError("User already exist", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    }
    throw new CustomError(" Invlaid User Details", 400);
  }
);

const loginUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email,
    });
  } else {
    res.status(401);
    throw new CustomError("Invalid email or password", 400);
  }
});

const getUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.userId).select("-password");
  res.status(200).json(user);
});

export { registerUser, loginUser, getUser };
