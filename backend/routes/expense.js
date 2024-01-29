import express from "express";
const router = express.Router();
import {
  getAllExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  getMoneyByCategory,
} from "../controllers/expense.js";
import auth from "../middlewares/auth.js";

router.get("/get-all-expense", getAllExpense);
router.post("/create-expense", addExpense);
router.put("/update-expense", updateExpense);
router.delete("/delete-expense/:id", deleteExpense);

router.get("/money-by-category", getMoneyByCategory);

export default router;
