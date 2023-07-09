const mongoose=require('mongoose')


const ProductSchema=mongoose.Schema({
    category:{type:String},
    Quantity:{type:Number},
    subtitle:{type:String},
    title:{type:String},
    strike_price:{type:Number},
    discounted_price:{type:Number},
    images:{type:Array},
    size:{type:Array},
    discount:{type:String},
    rating:{type:Number},
    rating_count:{type:String},
    UserID:String
},{
    versionKey:false,
    timestamps:true
})



const ProductModel=mongoose.model("product",ProductSchema)

module.exports={
    ProductModel
}