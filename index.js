
require('dotenv').config()
const express = require(`express`)
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const bcrypt = require(`bcrypt`)
const jwt=require(`jsonwebtoken`)
const app = express()
app.use(express.json())


app.get("/", async (req, res) => {
    res.send(`WelCome to The Clone of AJIO`)
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
   console.log(Email,Password)
    try{
        let data=await UserModel.findOne({Email:Email})
        if(data){
            bcrypt.compare(Password,data.Password).then(async function(result) {
               if(result){
                let token = jwt.sign({ UserId: data._id }, 'ajio');
              // await UserModel.findByIdAndUpdate({_id:data._id},{is_active:true})
                res.send(token)
                res.send({"msg":"Login Successfull","token":token})
               }else{
                res.send({"msg":"Login Successfull","token":token})
               }
             });
        }else{
            res.send({"msg":"User not found!"})
        }
     
    }catch(err){
        res.send({"msg":"somthing went wrong! cannot login","error":err.message})
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