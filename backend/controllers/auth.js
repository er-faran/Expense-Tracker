import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name,
    });

    res
      .status(201)
      .json({
        result,
        message: "You have signed up successfully",
        status: 201,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", status: 500 });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist", status: 404 });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: 400 });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      result: oldUser,
      token,
      message: "You have signed successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", status: 500 });
    console.log(error);
  }
};
