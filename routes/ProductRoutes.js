const express=require('express')
const { ProductModel } = require('../model/ProductsModel')



const ProductRouter=express.Router()

ProductRouter.post("/add",async(req,res)=>{
   // console.log(req.body.userID)
 let data=req.body
    try{
        let newdata=new ProductModel(data)
        await newdata.save()
        res.send({"msg":"Product has been added successfully"})

    }catch(err){
        res.send({"msg":"somthing went wrong! cannot add the product","error":err.message})
    }
})

ProductRouter.get("/",async(req,res)=>{
    let id=req.body.UserID
    console.log(id)
    try{
        let newData=await ProductModel.find({UserID:id}) 
        res.send(newData)
    }catch(err){
        res.send({"msg":"cannot get products","error":err.message})
    }
})


ProductRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    let payload=req.body
    console.log("paramsid",id)
    try{
          await ProductModel.updateOne({_id:id},payload)
          res.send({"msg":"Product has been updated"})
    }catch(err){
          res.send({"msg":"somthing went wrong! cannot update","error":err.message})
    }
})


ProductRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
     try{
        await ProductModel.deleteOne({_id:id})
        res.send({"msg":"Product has been deleted "})
     }catch(err){
        res.send({"msg":"somthing went wrong! cannot delete","error":err.message})
     }

})

module.exports={
    ProductRouter
}