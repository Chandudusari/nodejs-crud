const express=require('express');
const {createRegister,getcontactdetails,currentuseDetails}=require('../controllers/loginControllers');
const validateToken = require('../middleware/validateTokenHandler');
const router=express.Router();

router.post("/reg",createRegister);

router.post("/log",getcontactdetails);

router.get("/user",validateToken,currentuseDetails);

module.exports=router;