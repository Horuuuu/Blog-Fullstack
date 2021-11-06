const express = require("express");
const router = express.Router();
const { Likes} = require("../models");
const{validateToken}=require("../middlewares/AuthMiddlewares")

router.post('/',validateToken,async(req,res)=>{
    const{PostId}=req.body;
    const UserId=req.user.id;

    const found=await Likes.findOne({where:{
         PostId :PostId ,UserId:UserId }})

         if(!found){//si encuentra el mismo le da like
    await  Likes.create({PostId:PostId, UserId:UserId})
    res.json({liked:true})
    }else{//sino lo dislikea
        await Likes.destroy({where:{ PostId:PostId, UserId:UserId },
    })}
       res.json({liked:false})
})

module.exports = router;