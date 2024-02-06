import UserModal from "../models/user.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModal.find().select("-password");
    if (!allUsers?.length > 0)
      return res.status(404).json({ message: "No User Found" });

    res.status(200).json({ result: allUsers, status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", status: 500 });
    console.log(error);
  }
};

export const addUser = async (req, res) => {
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

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "1h",
    // });
    res.status(201).json({
      result,
      message: "You have signed up successfully",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", status: 500 });
    console.log(error);
  }
};
