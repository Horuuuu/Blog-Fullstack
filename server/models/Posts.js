//Tabla de posteos
module.exports = (sequelize, DataTypes) => {//exporta para usarlo en toda la app
  const Posts = sequelize.define("Posts", {
    title: {//columna de titulo
      type: DataTypes.STRING,
      allowNull: false,//NOTNULL
    },
    postText: {//columna del contenido 
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {//columna del usuario
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
//asociacion de sequelize con la tabla de comentarios
Posts.associate = (models) =>{
Posts.hasMany(models.Comments,{//asocia la tabla post con diferentes comentarios comentarios de diferentes usuarios
  onDelete:"cascade",//si borra un posteo se borran todos los comentarios de ése post
})

Posts.hasMany(models.Likes,{
  onDelete:"cascade",
})
}
  return Posts;
};
