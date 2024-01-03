import express from "express";
import { ValidateLoginUser, VerifyTokenMiddleware } from "../middleware";
import {
  logOutController,
  loginUserController,
  validateTokenController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", ValidateLoginUser, loginUserController);
router.get("/validate-token", VerifyTokenMiddleware, validateTokenController);
router.get("/logout", VerifyTokenMiddleware, logOutController);
export default router;
