import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';
import Account from "./models/accounts.model.js";
import authRoutes from './routes/auth.routes.js';


dotenv.config();
const signin = express();

// Enable CORS for all routes
signin.use(cors());
signin.use(express.json());

// Add a test route to verify the server is running
signin.get('/api/test', (req, res) => {
  console.log('Main test route accessed');
  res.status(200).json({ success: true, message: 'API is working!' });
});
signin.post("/api/accounts", async (req,res) => {
    const account = req.body;
 
    if(!account.username || !account.mobilenumber || !account.password){
        return res.status(400).json({success:false,message: "All fields are required"});

    }

    const newAccount = new Account(account)

    try{
        await newAccount.save();
        res.status(201).json({success:true, data: newAccount});
    }
    catch (error){
        res.status(500).json({success:false, message: "Server Error"});
    }
}); 

signin.use('/api/auth', authRoutes);

signin.listen(5000, () =>{
    connectDB();
    console.log(" Server started at 5000");
})


//