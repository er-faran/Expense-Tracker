import UserModal from "../models/user.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
    try {
      const allUsers = await UserModal.find().select("-password");
      if (!allUsers?.length > 0)
        return res.status(404).json({ message: "No User Found" });
  
      res.status(200).json({ result: allUsers });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

export const addUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
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
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};