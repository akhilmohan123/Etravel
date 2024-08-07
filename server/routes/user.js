const express=require("express")
const { sign_up, login, get_user_data } = require("../helper/user_helper")
const router=express.Router()
const multer=require("multer")
const upload = multer({ dest: "uploads/" });
const cors=require("cors")
router.get("/",(req,res)=>{
    console.log("Hello i am here ")
})
router.post("/sign-up",upload.single("file"),sign_up)
router.post("/login",login)
router.get("/profile",get_user_data)

module.exports=router