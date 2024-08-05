const express=require("express")
const { sign_up, login, get_user_data } = require("../helper/user_helper")
const router=express.Router()
const multer=require("multer")
const upload = multer({ dest: "uploads/" });
router.get("/",(req,res)=>{
    console.log("Hello i am here ")
})
router.post("/sign-up",upload.single("file"),sign_up)
router.post("/login",login)
router.get("/edit",get_user_data)
module.exports=router