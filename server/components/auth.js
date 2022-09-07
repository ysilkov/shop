import mongoose from "mongoose";

const Auth = new mongoose.Schema({
    user: {type: String, required: true},
    password: {type: String, required: true}
})

export default mongoose.model("Auth", Auth)