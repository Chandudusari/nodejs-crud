const asyncHandler=require('express-async-handler')

const Contact=require('../models/contactModels');


const getcontact=asyncHandler(async(req,res)=>{ 
    const contacts=await Contact.find()   
    res.status(200).json(contacts); 
});

const createcontact=asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone} =req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error('all fields are required');
    }
    const contacts=await Contact.create(({
    name,email,phone
    }))
    res.status(201).json(contacts); 
    
});

const getcontactdetails=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact); 
});

const updatecontact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    const updatecontact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatecontact); 
});

const deletecontact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    await Contact.deleteOne({"_id":req.params.id});
    res.status(200).json(contact); 
});

module.exports={getcontact,createcontact,getcontactdetails,updatecontact,deletecontact}