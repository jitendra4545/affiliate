const mongoose=require(`mongoose`)


const UserSchema=mongoose.Schema({
    Name:{required:true,type:String},
    Email:{required:true,type:String},
    Mobile:{required:true,type:Number},
    Password:{required:true,type:String},
    ConfirmPassword:{required:true,type:String},
    is_Active:{required:true,type:Boolean}
},{
    versionKey:false,
    timestamps:true
})


const UserModel=mongoose.model('userlist',UserSchema)


module.exports={
    UserModel
}