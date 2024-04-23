const asyncHandler=require('express-async-handler')

const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

const Registration=require('../models/loginModels');

const createRegister=asyncHandler(async(req,res)=>{
    const {username,email,password} =req.body;
    if(!username || !password || !email ){
        //console.log(req.body,username,email,password);
        res.status(400);
        throw new Error('all fields are required');
    }
    const useravailable=await Registration.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error('user already available');
    }
    const hashpassword=await bcrypt.hash(password,10)
    const register=await Registration.create(({
    "username":username,"email":email,"password":hashpassword
    }));
    if(register)
    res.status(201).json(register);
});

const getcontactdetails=asyncHandler(async(req,res)=>{
    //const {email,password}=req.body;
    const contact=await Registration.findOne({"email":req.body.email});
    console.log("entered")
    if(!contact){
        res.status(404);
        throw new Error("contact not found please register");
    }
    //const user=await Registration.findOne({"email":req.body.email});
    if (contact && (await bcrypt.compare(req.body.password,contact.password))){
        const accessToken=jwt.sign({
           user: {
                email:contact.email,
                username:contact.username,
                id:contact.id
            },
        },process.env.SECRETE_KEY,{expiresIn:"2m"})
        res.status(200).json(accessToken);
    }
    else{
    res.status(404);
    throw new Error("please enter correct password");
    }

});
const currentuseDetails=asyncHandler(async(req,res)=>{
    res.status(200).json({user:req.user});
});

module.exports={createRegister,getcontactdetails,currentuseDetails};