const express=require('express');
const {getcontact,createcontact,getcontactdetails,updatecontact,deletecontact}=require('../controllers/contactControllers');
const router=express.Router();

router.route('/').get(getcontact).post(createcontact);

router.route('/:id').get(getcontactdetails).put(updatecontact).delete(deletecontact);


module.exports=router;