import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'


function Registration() {
    const initialValues = {    
        username: "",
        password:""
      };
      

      const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(6).max(20).required()
      });
       //funcion que se ejecuta cada vez que se clickea el boton
       const onSubmit=(data)=>{//hace peticion a la url y envia data
           axios.post("http://localhost:3001/auth",data).then=(()=>{
             alert("YA ESTAS REGISTRADO,DIRIGETE A INICIO DE SESION")
               console.log(data)//data valores de los input
               
           })
       }


    return (
        <div>
            <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Juan123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            
            id="inputCreatePost"
            name="password"
            type="password"
            placeholder="TU CONTRASEÑA..."
          />
          <button type="submit" > Registrarse</button>
        </Form>
      </Formik>
        </div>
    )
}

export default Registration
