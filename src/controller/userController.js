const User=require("../models/userModel.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const register=async(req,res)=>{
    // const {username,password,role}=req.body
// console.log("contoller");
try {
    
    const{username,email,password,role,phone}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    // res.send("reg")
    const newUser=new User({username,password:hashedPassword,role,email,phone})
    const savedUser=await newUser.save()
    res.status(201).json({message:`user created with username ${username}`})
} catch (error) {
    res.status(500).json({message:`internal error`})   
}
}
const login=async(req,res)=>{
// console.log("contoller login");
try {
    
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:`user not found`})   

    }
   const isMatch=await bcrypt.compare(password,user.password)
   if(!isMatch){
    res.status(400).json({message:` password not matching`})   

   }
   const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).json({token})
} catch (error) {
    res.status(500).json({message:`internal error`})   

}
}

module.exports={register,login}