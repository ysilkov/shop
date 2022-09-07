import express from "express";
import mongoose from "mongoose"
import router from "./router.js"

const PORT = 4000;
const app = express();
app.use(express.json())
const DBL_URL = `mongodb+srv://user:user@cluster0.ju1rfue.mongodb.net/?retryWrites=true&w=majority`

app.use("/api", router)

async function startApp(){
try{
await mongoose.connect(DBL_URL, {useUnifiedTopology: true, useNewUrlParser: true})
app.listen(PORT, ()=>console.log('SERVER STARTED ON PORT 4000'))
}catch(e){
console.log(e)
}
}
startApp()
