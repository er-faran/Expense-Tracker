import ExpenseModal from "../models/expense.js";
import bcrypt from "bcryptjs";

export const getAllExpense = async (req, res) => {
  try {
    const allExpense = await ExpenseModal.find().select();
    if (!allExpense?.length > 0)
      return res.status(404).json({ message: "No User Found" });

    res.status(200).json({ result: allExpense });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const addExpense = async (req, res) => {
  const { id, amount, expenseCategory, date, time, notes } = req.body;
  try {
    const existExpense = await UserModal.findOne({ id });

    if (existExpense) {
      return res.status(400).json({ message: "Expense already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    const result = await ExpenseModal.create({
      id,
      amount,
      expenseCategory,
      date,
      time,
      notes,
    });

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "1h",
    // });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
