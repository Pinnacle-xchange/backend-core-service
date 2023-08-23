import express from "express";
import { protect } from "../middleware/authMiddleware";

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/getuser", protect, getUser);

export default router;
