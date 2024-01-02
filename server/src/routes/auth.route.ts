import express from "express";
import { ValidateLoginUser } from "../middleware";
import { loginUserController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", ValidateLoginUser, loginUserController);

export default router;
