const mongoose =require("mongoose")

const User_schema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
         validate:{
            validator:function(value){
                if(this.isGoogleuser){
                    return true
                }else{
                    return value && value.length >0
                }
                
            }
             
         }
        
    },
    isGoogleuser:{
        type:Boolean,
        default:false
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
    },
    Loginmethod:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    Googleid:{
        type:String,
        sparse:true,
        unique:true
    },
    Googlephoto:{
        type:String,
        sparse:true
    }
})
const User=mongoose.model("User",User_schema)
module.exports=User