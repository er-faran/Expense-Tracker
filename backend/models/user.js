import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: false},
    id: {type: String},
});

export default mongoose.model("User", userSchema);