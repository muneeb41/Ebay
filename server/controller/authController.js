import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel.js';


const maxAge = 3 * 24 * 60 * 60 * 1000;

export const signup = async (req, res) => {
    try {
      const { email, password ,name } = req.body;
  
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user with the hashed password
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword, // Store hashed password
      });
  
      // Save the user to the database
      await newUser.save();
  
      // generate token
      const token = jwt.sign({ email,id:newUser._id }, process.env.JWT_KEY);

      res.cookie('jwt',token,{
        maxAge,
        secure:true,
        sameSite:'None'
      })
  
      return res.status(201).json({
        message: "User Created Successfully",
        user: newUser
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };


  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "User doesn't found !" });
      }
      
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
  
      // generate token
      const token = jwt.sign({ email ,id:existingUser._id}, process.env.JWT_KEY);

      res.cookie('jwt',token,{
        maxAge,
        secure:true,
        sameSite:'None'
      })
  
      return res.status(201).json({
        message: "User Login Successfully",
        user: existingUser
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };


 export const getUser = async (req, res) => {
     try {
       const user = await UserModel.findById(req.id);
       if(!user) return res.status(404).json({message: "User not found"});
       res.status(200).json({user});
     } catch (error) {
       console.error(error);
       return res.status(500).json({message: "Server error", error });
     }
 } 










  export const logout = async (req, res) => {
    try {
      res.cookie('jwt','',{
        maxAge:1,
        secure:true,
        sameSite:'None'
      })
  
      res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: "Server error", error });
    }
} 

