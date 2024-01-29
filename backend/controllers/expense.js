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

export const updateExpense = async (req, res) => {
  const { id, amount, expenseCategory, date, time, notes, dateEvent } =
    req.body;

  try {
    // Check if the expense with the given ID exists
    const existingExpense = await ExpenseModal.findOne({ id });

    if (!existingExpense) {
      return res
        .status(404)
        .json({ message: "No Expense exists for this record." });
    }

    // Update the existing expense
    const updatedExpense = await ExpenseModal.updateOne(
      { id },
      {
        $set: {
          amount,
          expenseCategory,
          date,
          time,
          notes,
          dateEvent,
        },
      }
    );

    res.status(200).json({
      updatedExpense,
      message: "Expense Record has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};

export const addExpense = async (req, res) => {
  const { id, amount, expenseCategory, date, time, notes, dateEvent } =
    req.body;
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
      dateEvent,
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

export const deleteExpense = async (req, res) => {
  const { id } = req.params; // Assuming id is passed as a parameter in the URL

  try {
    // Check if the expense with the given ID exists
    const existingExpense = await ExpenseModal.findOne({ id });

    if (!existingExpense) {
      return res
        .status(404)
        .json({ message: "No Expense exists for this record." });
    }

    // Delete the existing expense
    await ExpenseModal.deleteOne({ id });

    res.status(200).json({
      message: "Expense Record has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};

export const getMoneyByCategory = async (req, res) => {
  try {
    // Calculate total amount spent across all categories
    const totalAmountResult = await ExpenseModal.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toInt: "$amount" } },
        },
      },
    ]);

    const totalAmount =
      totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

    // Calculate percentage for each category
    const moneyByCategory = await ExpenseModal.aggregate([
      {
        $unwind: "$expenseCategory",
      },
      {
        $group: {
          _id: "$expenseCategory",
          totalAmount: { $sum: { $toInt: "$amount" } },
        },
      },
      {
        $project: {
          category: "$_id",
          totalAmount: "$totalAmount",
          percentage: {
            $multiply: [{ $divide: ["$totalAmount", totalAmount] }, 100],
          },
        },
      },
    ]);

    // Include the total amount in the response
    res.status(200).json({ totalAmount, moneyByCategory });
  } catch (error) {
    console.error("Error fetching money by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getMoneyByCategory = async (req, res) => {
//   try {
//     // Calculate total amount spent across all categories
//     const totalAmountResult = await ExpenseModal.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: { $toInt: "$amount" } },
//         },
//       },
//     ]);

//     const totalAmount =
//       totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

//     // Calculate percentage for each category
//     const moneyByCategory = await ExpenseModal.aggregate([
//       {
//         $unwind: "$expenseCategory",
//       },
//       {
//         $group: {
//           _id: "$expenseCategory",
//           totalAmount: { $sum: { $toInt: "$amount" } },
//         },
//       },
//       {
//         $project: {
//           category: "$_id",
//           totalAmount: "$totalAmount",
//           percentage: {
//             $multiply: [{ $divide: ["$totalAmount", totalAmount] }, 100],
//           },
//         },
//       },
//     ]);

//     // Include the total amount in the response
//     res.status(200).json({ totalAmount, moneyByCategory });
//   } catch (error) {
//     console.error("Error fetching money by category:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getMoneyByCategory = async (req, res) => {
//   try {
//     const moneyByCategory = await ExpenseModal.aggregate([
//       {
//         $group: {
//           _id: "$expenseCategory",
//           totalAmount: { $sum: { $toInt: "$amount" } },
//         },
//       },
//     ]);

//     res.status(200).json(moneyByCategory);
//   } catch (error) {
//     console.error("Error fetching money by category:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
