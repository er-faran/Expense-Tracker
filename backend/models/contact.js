import mongoose from "mongoose";

const contactUsSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true},
    subject: {type: String, require: true},
    message: {type: String, require: true},
    number: {type: String}
});

export default mongoose.model("ContactUs", contactUsSchema);