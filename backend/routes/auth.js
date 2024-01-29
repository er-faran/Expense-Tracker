import express from "express";
const router = express.Router();
import { login, register } from "../controllers/auth.js";

router.post("/signin", login);
router.post("/signup", register);

export default router;
