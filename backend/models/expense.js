import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  amount: { type: String, required: true },
  expenseCategory: { type: Object, required: true },
  notes: { type: String, required: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  dateEvent: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  userID: { type: String, required: true },
});

export default mongoose.model("Expense", expenseSchema);
