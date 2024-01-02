import express from "express";
import { registerUserController } from "../controllers/users.controller";
import { ValidateUserRegistration } from "../middleware";

const router = express.Router();

router.post("/register", ValidateUserRegistration, registerUserController);

export default router;
