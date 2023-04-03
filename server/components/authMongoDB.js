import mongoose from "mongoose";

const AuthMongoDB = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true,  required: true},
    password: {type: String, required: true}
})

export default mongoose.model("Auth", AuthMongoDB)