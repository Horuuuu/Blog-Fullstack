import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

function Post() {
  let { id } = useParams();//para tomar el id de cada posteo
  const [postObject, setPostObject] = useState({});//estado que contiene info del posts,titulo,usuario,etc
  const [comments, setComments] = useState([]);//estado de la lista de comentarios de cada post
  const [newComment, setNewComment] = useState("");//estado para lo que se escribe en el input
  const { authState } = useContext(AuthContext);

  let history = useHistory();
//posteo en paginas individuales por id tomado de la base de datos
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
//peticion para comentarios deacuerdo al id de la url
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);//data es la lista de comentarios
    });
  }, []);

  const addComment = () => {
    axios
      .post(//agrega comentarios
        "http://localhost:3001/comments",
        {//este es el body ,la info que envia a la base de datos
          commentBody: newComment,//el valor de la columna commentbody
          PostId: id,//el valor del postID es el id tomado del params
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);//para que aparezca en pantalla inmediatamente
          setNewComment("");//limpia el input luego de agregar comentarios
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(//filtra de la lista de comentarios
          comments.filter((val) => {//cada elemento de la lista tiene un value
            return val.id != id;//retorna si el id es distinto al id que estoy tratando de borrar
          })//boolean, value es la lista de comentarios y sí es igual lo borra
        );
      });
  };

  const deletePost = (id) => {//id de params
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },//para que sepa que está logeado
      })
      .then(() => {
        history.push("/");
      });
  };
//variable para editar titulo y contenido del post
  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Ingresar nuevo titulo:");//variable resultado de la edicion
      axios.put("http://localhost:3001/posts/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

     //al  estado se le agrega,los cambios en el titulo
      setPostObject({ ...postObject, title: newTitle });//desustructuring

    } else {
      let newPostText = prompt("Escribir nuevo texto:");
      axios.put("http://localhost:3001/posts/postText",
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
        //al objeto de post se le agrega los cambios en el contenido
      setPostObject({ ...postObject, postText: newPostText });//para renderizar inmediatamente los cambios
    }
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">

          <div className="title" 
          onClick={()=>{
            if(authState.username === postObject.username )//habilita la edicion del titulo
           {editPost("title")}}}> 
           {postObject.title} </div>

          <div className="body" onClick={()=>{
            if(authState.username === postObject.username){//sí coincide el usuario logeado y el autor del post
            editPost("body")}}}>
              {postObject.postText}</div>

          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (//sí el usuario que inició sesion es igual
              <button//al que escribió el post,muetra el boton de borrar
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                
                Borrar
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comentario..."
            
            value={newComment}//el valor inicial del input
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Agregar Comentario</button>
        </div>
        
        <div className="listOfComments">
          {comments.map((comment, key) => {//lista los comentarios
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                
                <label> Usuario: {comment.username}</label>
                
                {authState.username === comment.username && (//se muestra el boton de borrar, sí el 
                //usuario autenticado es igual al que escribió el comentario
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;