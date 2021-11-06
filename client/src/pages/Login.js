import React,{useState,useContext} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../Contexts/AuthContext'


function Login() {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const{setAuthState}=useContext(AuthContext)


    let history=useHistory();

    const login=()=>{
        const data={username:username,password:password}
        axios.post("http://localhost:3001/auth/login",data).then((response)=>{
       if(response.data.error) {
           alert(response.data.error);
        }
       else{
        localStorage.setItem("accessToken",response.data.token);
        setAuthState({
            username:response.data.username, 
            id:response.data.id , 
            status:true});//cambia el estado a verdadero
        history.push("/")//redirige al la pagina principal
       }
       
     })
    }

    return (
        <div className="loginContainer">
            <label >Usuario</label>
           <input type="text" 
            onChange={(event)=>{setUserName(event.target.value)}}/>
            
        <label>Contraseña</label>
           <input type="password"  
            onChange={(event)=>{setPassword(event.target.value)}}/>

           <button onClick={login}>Ingresar</button>
        </div>
    )
}

export default Login
