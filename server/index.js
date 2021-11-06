//Backend
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Rutas
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
//ruta login 
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

//punto de entrada a la api
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Servidor funcionando en puerto 3001");
  });
});
