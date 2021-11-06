const express = require("express");
const router = express.Router();
const { Users} = require("../models");//para cambiar la tabla de usuarios
const bcrypt=require('bcrypt')
const{validateToken}=require('../middlewares/AuthMiddlewares')
const{sign}=require('jsonwebtoken')//la funcion sign genera token

router.post("/", async (req, res) => {
  const{username,password}=req.body;//guarda en la bd
  bcrypt.hash(password,10).then((hash)=>{
      Users.create({//agrega nuevo usuario a la tabla
          username :username,
          password:hash,//la contraseña en la tabla aparece encriptada
      })
      res.json('completado')
  })
  
});
router.post("/login",async(req,res)=>{
  const{username,password}=req.body;
  //sequelize busca a un usuario que se logeó y coincida con el regitrado en la tabla 
  const user=await Users.findOne({where:{username:username}})
//sino encuentra el usuario no existe
  if(!user)res.json({error:"el usuario no existe"})
 //si lo encuentra bcrypt compara la contraseña escrita para logearse y la que está en la tabla junto al usuario
  bcrypt.compare(password,user.password).then((match)=>{
   //sino coincide 
    if(!match)res.json({error:"combinacion de ususario y contraseña equivocadas"})
    //variable en donde almacena la info privada de cada usuario 
    const accessToken=sign
    ({username:user.username , id:user.id},//cada token almacena el usuario y el id
      "importantsecret");
    res.json({token:accessToken,username:username,id:user.id})
  })
})

router.get('/auth',validateToken,(req,res)=>{
res.json(req.user)//retorna si es valido o no
});
//para la pagina de perfil,nombre de usuario
router.get("/basicinfo/:id", async (req, res) => {//lo toma del id
  const id = req.params.id;//a travez de los params

  const basicInfo = await Users.findByPk(id, {//busca por clave primaria en la tabla la info del usuario
    attributes: { exclude: ["password"] },//excluye la contraseña de la peticion
  });

  res.json(basicInfo);
});
//ruta del cambio de contraseña
router.put("/changepassword",validateToken,async(req,res)=>{
  const{oldPassword,newPassword}=req.body;
  const user=await Users.findOne({where:{username:req.user.username}})
//compara la contraseña a cambiar con la de la tabla
  bcrypt.compare(oldPassword,user.password).then(async(match)=>{  
    
    if(!match)res.json({error:"contraseña equivocada"})//sino coinciden...,no puede actualizarse
    //hash la nueva contaseña
 bcrypt.hash(newPassword,10).then((hash)=>{
     Users.update({password:hash},{where:{username:req.user.username}})
   
    res.json('completado')
})
  })
})


module.exports = router;