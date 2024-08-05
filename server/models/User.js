const mongoose =require("mongoose")

const User_schema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    Image:{
        type:Object
    }
})
const User=mongoose.model("User",User_schema)
module.exports=User