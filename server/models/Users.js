module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Users.associate = (models) =>{//por cada posteo ,hay una posibilidad de like
      Users.hasMany(models.Likes,{//cada usuario puede tener diferentes likes
        onDelete:"cascade",
      })
      Users.hasMany(models.Posts,{//cada usuario puede tener muchos posteos
        onDelete:"cascade",
      })
    }


    return Users;
  };