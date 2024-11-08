const mongoose=require('mongoose')

const userScheme=new mongoose.Schema({
    username:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        },
    github:{
        type:String
        },
    linkedin:{
        type:String
    },
    profilepic:{
        type:String
    }
})

const users=mongoose.model('users',userScheme)
module.exports=users;


