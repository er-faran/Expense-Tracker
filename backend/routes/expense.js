import express from "express";
const router = express.Router();
import { getAllExpense, addExpense } from "../controllers/expense.js";
import auth from "../middlewares/auth.js";

router.get("/get-all-expense", getAllExpense);
router.post("/create-expense", addExpense);

export default router;
