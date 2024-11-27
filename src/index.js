const express=require("express")
const dotenv=require("dotenv").config()
const dbConnect=require("./config/dbConnect")
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const app=express()

dbConnect()
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`SERVER:${PORT}`);
    
})