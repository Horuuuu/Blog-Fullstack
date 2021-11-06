import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from "../Contexts/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);//estado para el arreglo de posteos likeados
  const { authState } = useContext(AuthContext);

  let history = useHistory();//para navegar dentro de la aplicacion

  useEffect(() => {//funcion se ejecuta inmediatamente
    if (!localStorage.getItem("accessToken")) {//primero verifica si el usuario no está logeado
      history.push("/login");//para ir a la ruta inicio sesion
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);//renderiaza lista de posteos
          setLikedPosts(//y sus likes
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {//lista de posteos
            if (post.id === postId) {//si se modifica el post existente
              if (response.data.liked) {//modifica el like del post
                return { ...post, Likes: [...post.Likes, 0] };//agrega al post original... un item
              } else {
                const likesArray = post.Likes;
                likesArray.pop();//elimina el item,con pop que elimina el ultimo item
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
              
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {//cada objeto es un post
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {//al clickear redirige a el post a una pagina individual
                history.push(`/post/${value.id}`);//basado en el id
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              
              <div className="username"><Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {//funcion que da like
                    likeAPost(value.id);
                  }}
                  className={//cambia el color del icono 
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }//sí en la lista de posteo likeados existe en el arreglo,  (valor y id), usá una clase sino otra
                />
                
                <label> {value.Likes.length/*cantidad de likes*/}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;