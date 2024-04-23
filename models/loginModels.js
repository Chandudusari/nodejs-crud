const mongoose=require('mongoose')

const contactSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'please add valid email'],
    },
    email:{
        type:String,
        required:[true,'please add valid email'],
        unique:[true,"email address already taken"]
    },
    password:{
        type:String,
        required:[true,"please add password"]
    }
},
    {
        timestamps:true
    }
);
module.exports=mongoose.model('registration',contactSchema);