import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expense.js";
import auth from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/expense", auth, expenseRouter);

app.get("/", (req, res) =>
  res.status(200).json({ message: "Application Running" })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB Connected and Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server Error : ", err);
  });
