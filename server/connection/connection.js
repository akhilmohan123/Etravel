function connection(){
    const mongoose=require('mongoose')
    require('dotenv').config()
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err+"error")
})
}
module.exports=connection