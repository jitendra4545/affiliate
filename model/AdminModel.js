const mongoose=require(`mongoose`)


const AdminSchema=mongoose.Schema({
    Name:{required:true,type:String},
    Email:{required:true,type:String},
    Mobile:{required:true,type:Number},
    Password:{required:true,type:String},
    is_Login:Boolean
   
},{
    versionKey:false
})

const AdminModel=mongoose.model('admin',AdminSchema)

module.exports={
    AdminModel
}