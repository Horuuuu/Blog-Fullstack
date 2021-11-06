//middlewares con una funcion ckeckea si continua con la peticion o no

const{verify}=require('jsonwebtoken')//funcion de jwt

//funcion de validacion 
const validateToken=(req,res,next)=>{//si es correcta la validacion continua con el proceso y  guarda en la bd
const accessToken=req.header("accessToken")//header para pasar al frontend
//sino retorna un token de acceso
if(!accessToken)return res.json({error:"Debes registrarte para participar"})

try{//variable de token validado=verifica que la respuesta a la peticion tenga un token
const validToken=verify(accessToken,"importantsecret")

req.user=validToken;//almacena el usuario y id en user

if(validToken){//si el token está validado sugue con el proceso
    return next();
}
}
catch(error){
return res.json({error:error})
}
}
module.exports={validateToken}//exportar para tenerlo en todos los archivos en donde hay que validar