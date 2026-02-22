import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req , res) =>{
    const {name , email , password} = req.body;
     if(!name || !email || !password ){
        return res.status(400).json({message : "All fields are required"});
     }

     const existingUser = await User.findOne({email});
     if(existingUser){
        return res.status(409).json({message : "User already exists"});
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({
        name,
        email,
        password:hashedPassword
     });
     
     const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    res.status(201).json({
        token,
        user: {id: user._id, name: user.name, email: user.email}
    });
};

export const login = async(req, res) =>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message : "Invalid Username or passsword"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({message : "Invalid password"});
    }
    const token  = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    );
    res.json({
        token,
        user : {id : user._id , name : user.name, email:user.email}
    });

};
// to get the name of the user for the topSearch bar in the website
export const getMe = async (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    _id: req.user._id,
  });
};