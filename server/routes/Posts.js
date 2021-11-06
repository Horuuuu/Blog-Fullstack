const express = require("express");
const router = express.Router();
//En la tabla Posts y Likes inserta datos
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddlewares");

router.get("/", validateToken, async (req, res) => {//funciones de sequelize son asincronas
  const listOfPosts = await Posts.findAll({ include: [Likes] });//selecciona tods los valores de la tabla 
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });//variable de posteos con like
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });//retorna dos objetos en formato json
});//la lista de posteos con  sus respectivos likes

//ruta para nombre de usuario en pag.individual deacuerdo al id en pag.perfil
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);//seuqelize busca por clave primaria(id)en la tabla Posts
  res.json(post);//respuesta con el posteo que recibimos
});
//ruta para mostrar posteos creados por un usuario deacuerdo al id en pagina perfil
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPost = await Posts.findAll({
    where:{UserId:id},//coincida el id de la tabla y el del usuario(params)
    include:[Likes]
  });
  res.json(listOfPost);
});
//inserta datos en la BD
router.post("/", validateToken, async (req, res) => {//sequelize es asincrono
  const post = req.body;//este es el body,el objeto de la peticion
  post.username = req.user.username;//se le agraga al posteo el usuario que inició sesion
  post.UserId=req.user.id;//para acceder a id del usuario
  await Posts.create(post);
  res.json(post);
});
//ruta para actualizar el titulo de un post
router.put("/title", validateToken, async (req, res) => {
  const {newTitle,id} = req.body; 
  await Posts.update({title:newTitle},{where:{id:id}})//update funcion de sequelize(campo a actulizar)y cuál post  actualizar
  res.json(newTitle);
});
//ruta para actualizar el contenido de un post
router.put("/postText", validateToken, async (req, res) => {
  const {newText,id} = req.body;
  await Posts.update({postText:newText},{where:{id:id}})
  res.json(newText);
});

//ruta para eliminar un post
router.delete("/:postId", validateToken, async (req, res) => {//postid es el post que elimina
  const postId = req.params.postId;
  await Posts.destroy({//elimina el posteo de la tabla Posts
    where: {//donde coincida el id de la tabla y el del post a borrar
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;//exportar para usar router en el index.js