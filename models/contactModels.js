const mongoose=require('mongoose')

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add contact name']
    },
    email:{
        type:String,
        required:[true,'please add valid email']
    },
    phone:{
        type:String,
        required:[true,'please add contact phone']
    },
    },
    {
    timestamps:true
    }
);

module.exports=mongoose.model('contact',contactSchema);