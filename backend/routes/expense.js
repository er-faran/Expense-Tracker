import express from "express";
const router = express.Router();
import { getAllExpense, addExpense } from "../controllers/expense.js";
import auth from "../middlewares/auth.js";

router.get("/get-all-expense", auth, getAllExpense);
router.post("/create-expense", auth, addExpense);

export default router;
