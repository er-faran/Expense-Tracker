import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  amount: { type: String, required: true },
  expenseCategory: { type: Array, require: true },
  notes: { type: String, require: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  isDeleted: { type: Boolean, require: true, default: false },
});

export default mongoose.model("Expense", userSchema);
