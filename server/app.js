const express=require("express")
const app=express()
require("dotenv").config()
const userrouter=require("./routes/user")
const connection=require("./connection/connection")
var body_parser=require("body-parser")
const cors=require("cors")
connection()


app.use(cors())
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}))
// parse application/json
app.use(body_parser.json())
app.use("/",userrouter)
app.listen(process.env.PORT,()=>{
    console.log("Server is listening to the port"+process.env.PORT)
})
