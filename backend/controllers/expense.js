import ExpenseModal from "../models/expense.js";

export const getAllExpense = async (req, res) => {
  try {
    const allExpense = await ExpenseModal.find().select();
    if (!allExpense?.length > 0)
      return res.status(404).json({ message: "No Expense Found" });

    res.status(200).json({ expenses: allExpense });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const addExpense = async (req, res) => {
  const { id, amount, expenseCategory, date, time, notes } = req.body;
  try {
    const existExpense = await ExpenseModal.findOne({ id });

    if (existExpense) {
      return res.status(400).json({ message: "Expense already exists" });
    }

    const result = await ExpenseModal.create({
      id,
      amount,
      expenseCategory,
      date,
      time,
      notes,
    });
    res.status(201).json({
      result,
      message: "Expense Record has been created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
