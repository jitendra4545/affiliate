const express=require('express')
const { AdminModel } = require('../model/AdminModel')
const bcrypt=require('bcrypt')
const jwt=require(`jsonwebtoken`)
const AdminRouter=express.Router()

AdminRouter.post("/signup", async (req, res) => {
    let data = req.body
    let { Password } = data
    try {
        bcrypt.hash(Password, 8, async function (err, hash) {
            if (hash) {
                let update = new AdminModel({ ...data, Password: hash})
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

AdminRouter.post("/login", async (req, res) => {
    const {Email,Password}=req.body
   
     try{
         let data=await AdminModel.findOne({Email:Email})
         //console.log(data)
         if(data){
             bcrypt.compare(Password,data.Password).then(async function(result) {
                if(result){
                
                 let token = jwt.sign({ UserID: data._id }, 'ajio');
                 let UpData=await AdminModel.findByIdAndUpdate({_id:data._id},{is_Login:true})
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

module.exports={
    AdminRouter
}