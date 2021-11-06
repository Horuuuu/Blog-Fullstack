const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const{validateToken}=require('../middlewares/AuthMiddlewares')
//ruta para comentarios deacuerdo al id de cada posteo
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    //sequelize busca en la tabla comentarios donde el id de la columna de la tabla conincida con el del parametro
    const comments = await Comments.findAll({where:{ PostId :postId  }})
    res.json(comments);
  });
//ruta para crear comentarios
router.post("/",validateToken,async(req,res)=>{
    const comment=req.body
    //para obtener el nombre de usuario el objeto user(que tiene nombre y id)
    const username=req.user.username;
    comment.username=username//crea comentario en bd del usuario  que está logeado e identifica al autor
    await Comments.create(comment);
    res.json(comment);
})
//ruta para borrar comentarios
router.delete("/:commentId",validateToken,async(req,res)=>{
  //se usa el id de la tabla de cada comentario para pasarlo e identificar cual borrar
  const commentId=req.params.commentId;
//sequeliza borra de la tabla comments
 await Comments.destroy({where:{
    id:commentId,
  },})
res.json('borrado completado')
})




module.exports = router;