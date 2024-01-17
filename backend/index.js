import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import contactUsRouter from "./routes/contact.js";
import expenseRouter from "./routes/expense.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/contact-us", contactUsRouter);
app.use("/expense", expenseRouter);

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
