import { SignUp, SignIn } from "../controllers/authController.js";
import { Router } from "express";

const router = Router();

router.post("/signUp", SignUp);

router.post("/", SignIn);

export default router;
