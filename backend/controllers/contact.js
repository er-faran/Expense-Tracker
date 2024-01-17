import ContactUsModel from "../models/contact.js";

export const contactUs = async (req, res) => {
    const { name, email, subject, message, number="" } = req.body;
    try {  
      const result = await ContactUsModel.create({
        name,
        email,
        subject,
        message,
        number
      });

      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const getAllContactUsData = async (req, res) => {
    try {
      const result = await ContactUsModel.find();
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };