import express from "express";


const signin = express();
signin.get("/", (req,res) => {
    res.send("Hi this is Kavi");
})
signin.listen(5000, () =>{
    console.log(" Server started at 5000");
})