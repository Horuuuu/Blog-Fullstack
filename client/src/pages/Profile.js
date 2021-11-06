import React, { useEffect ,useState,useContext} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from'axios'
import { AuthContext } from "../Contexts/AuthContext";

function Profile() {
    let{id}=useParams();
    let history=useHistory()
       const [username,setUsername]=useState("");
       const [listOfPosts,setListOfPosts]=useState([])//contiene todos los posts del usuario
       const { authState } = useContext(AuthContext);

       useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {//respuesta tomada del id
          setUsername(response.data.username);//muestra el nombre del usuario
        });
    
        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
          setListOfPosts(response.data);//muestra lista de post escritos por el usuario
        });
      }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h2> Usuario:{username}</h2>
                <h3>Entradas de {username}</h3>
                {authState.username===username &&//sí el usuario logeado es el mismo que del perfil  se muestra el boton
                //cuando se clickea se redirige a la pag.de cambiar contraseña
                (<button className="btn-profile" onClick={()=>{history.push('/changepassword')}}>Cambiar contraseña</button>)}
            </div>

            <div className="listOfPosts">
            {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                

                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
            </div>
        </div>
    )
}

export default Profile
