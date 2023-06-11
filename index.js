
require('dotenv').config()
const cors=require('cors')
const express = require(`express`)
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const bcrypt = require(`bcrypt`)
const jwt=require(`jsonwebtoken`)
const { AdminRouter } = require('./routes/AdminRoutes')
const { ProductRouter } = require('./routes/ProductRoutes')
const { auth } = require('./middleware/auth')
const app = express()
app.use(express.json())
app.use(cors())
app.use("/admin",auth)
app.use("/admin",AdminRouter)
 app.use("/product",auth)
app.use("/product",ProductRouter)
app.get("/", async (req, res) => {
    res.send(`WelCome to The Clone of AJIO`)
})

app.get("/alluser",async(req,res)=>{
    
    try{
        let AllData=await UserModel.find()
        res.send(AllData)
    }catch(err){

    }
})




app.post("/register", async (req, res) => {
    let data = req.body
    let { Password, ConfirmPassword } = data
    try {
        bcrypt.hash(Password, 8, async function (err, hash) {
            if (hash) {
                let update = new UserModel({ ...data, Password: hash, ConfirmPassword: hash })
                await update.save()
                res.send({ "msg": "You have been registered successfully" })
            } else {
                res.send({ "msg": "somthing went wrong while hashing password" })
            }
        });
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot register", "error": err.message })
    }
})



app.post("/login", async (req, res) => {
   const {Email,Password}=req.body
  // console.log(Email,Password)
    try{
        let data=await UserModel.findOne({Email:Email})
        //console.log(data)
        if(data){
            bcrypt.compare(Password,data.Password).then(async function(result) {
               if(result){
               
                let token = jwt.sign({ UserID: data._id }, 'ajio');
               let UpData=await UserModel.findByIdAndUpdate({_id:data._id},{is_Active:true})
               console.log("dataaa",UpData)
                
                res.send({"msg":"Login Successfull","token":token})
               }else{
                res.send({"msg":"Wrong Credentials"})
               }
             });
        }else{
            res.send({"msg":"User not found!"})
        }
     
    }catch(err){
        res.send({"msg":"somthing went wrong! cannot login","error":err.message})
    }
})


app.patch("/logout",auth,async(req,res)=>{
  let id=req.body.UserID
 console.log(id)
    try{
           let data=await UserModel.findByIdAndUpdate({_id:id},{"is_Active":false})
           res.send({"msg":"Your account is logged out"})
    }catch(err){
        res.send({"msg":"somthing went wrong! cannot logout Account","error":err.message})
    }
})


//try{}catch(err){}
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`connected to DB`)
    } catch (err) {
        console.log(`cannot connect`)
    }
    console.log(`server running on port ${process.env.port}`)
})