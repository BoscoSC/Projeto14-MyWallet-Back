import {
  getUserInfo,
  newEntry,
  newWithdraw,
} from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.get("/mainPage", getUserInfo);

router.post("/entry", newEntry);

router.post("/withdraw", newWithdraw);

export default router;
