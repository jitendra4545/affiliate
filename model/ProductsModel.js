const mongoose=require('mongoose')


const ProductSchema=mongoose.Schema({
    Brand:{required:true,type:String},
    Quantity:{required:true,type:Number},
    Type:{required:true,type:String},
    Title:{required:true,type:String},
    StrikePrice:{required:true,type:Number},
    DiscountPrice:{required:true,type:Number},
    Image:{required:true,type:String},
    Size:{required:true,type:String},
    Discount:{required:true,type:String},
    Rating:{required:true,type:Number},
    UserID:String
},{
    versionKey:false,
    timestamps:true
})



const ProductModel=mongoose.model("product",ProductSchema)

module.exports={
    ProductModel
}