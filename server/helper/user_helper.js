const multer = require("multer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const User = require("../models/User");
require("dotenv").config()
const jwt=require("jsonwebtoken");
const { jwt_verify } = require("./jwt");
module.exports = {
  sign_up: async (req, res) => {
    console.log("Sign-up called");
    try {
        console.log(req.body)
      const { name, email, password } = req.body;
      
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      let filePath = req.file.path;
      var img = fs.readFileSync(filePath);
      var encode_image = img.toString("base64");
      var finalImg = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, "base64"),
      };

      const userExists = await User.findOne({ Email: email });
      if (userExists) {
        return res.status(400).json({ data: "User already exists" });
      }

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: err.message });
        }

        const user = new User({
          Username:name,
          Email: email,
          Password: hash,
          Image: finalImg,
        });


        try {
          await user.save()
          console.log("User saved successfully");
          return res.status(201).json({ data: true });
        } catch (error) {
            console.log(error)
          console.error("Error saving user:", error);
          return res.status(500).json({ error: error.message });
        }
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      return res.status(500).json({ data: false, error: error.message });
    }
  },
  login:async(req,res)=>{
    let exist_user={}
   try {
    const{email,password}=req.body
    const exist_email=await User.findOne({Email:email})
    if(exist_email){
      const exist_password=exist_email.Password
      bcrypt.compare(password, exist_password, function(err, result) {
        console.log(result)
        if(result){
         exist_user.Username=exist_email.Username;
         exist_user.Email=exist_email.Email;
       
          const token=jwt.sign({data:exist_user},process.env.JWT_SECRET_KEY,{ expiresIn: '1800s',algorithm: 'HS256',  })
          res.status(200).json({data:token})
        }else{
          res.status(400).json({data:false,message:"Password no match"})
        }
        
    });
    }else{
      return res.status(400).json({data:false,message:"User Email Not match"})
    }
   } catch (error) {
       return res.status(400).json({data:false,message:"Network Error"})
   }
  },
   get_user_data : async (req, res) => {
    try {
      // Use await to handle the promise returned by jwt_verify
      const user = await jwt_verify(req);
      
      // Send a successful response with user data
      res.status(200).json(user);
    } catch (error) {
      // Handle and send errors with proper status and message
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
