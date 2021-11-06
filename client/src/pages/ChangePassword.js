import React ,{useState}from 'react'
import axios from'axios'

function ChangePassword() {
const[oldPassword,setOldPassword]=useState("")
const[newPassword,setNewPassword]=useState("")

const changePassword=()=>{
    axios.put("http://localhost:3001/auth/changepassword",{
        oldPassword:oldPassword,//en el body
        newPassword:newPassword
    },{
        headers: {//autentica
            accessToken: localStorage.getItem("accessToken"),
          },
    }.then((response)=>{
        if(response.data.error){//comprueba los errores 
            alert(response.data.error)
        }
    }))
}

    return (
        <div className="createPostPage">
           <h1>Cambia tu contraseña</h1>
           <div className="formChangePassword" >
           <input type="text" placeholder="Actual contraseña..."
           //captura cambios en el input
            onChange={(event)=>{setOldPassword(event.target.value)}}/> 

           <input type="text" placeholder="Nueva contraseña..."
           onChange={(event)=>{setNewPassword(event.target.value)}} /> 
           
           <button onClick={changePassword}>Guardar cambios</button>
        </div>
        </div>
    )
}

export default ChangePassword
