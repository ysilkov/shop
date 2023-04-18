import mongoose from "mongoose";
const OrderMongoDB = new mongoose.Schema({
   fullName: {type: String},
   address: {type: String},
   phone: {type: String},
   email: {type: String},
   delivery: {type: String},
   order: {type: Array},
})

export default mongoose.model("Order", OrderMongoDB)