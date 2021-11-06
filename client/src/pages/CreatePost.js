import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();
  //valores iniciales para el formulario
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {//primero ,sí el usuario no está logeado
      history.push("/login");//lo direcciona a iniciar sesion
    }
  }, []);
  //objeto de los valores necesarios para validar el formulario
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Debes poner un Titulo!"),//valida si pones un string y no funcione numero
    postText: Yup.string().required("Escribe algun texto"),//requerido si o si
  });

  const onSubmit = (data) => {//enviamos data del formulario
    axios//a la BD
      .post("http://localhost:3001/posts", data, {//el body es la data
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history.push("/");//redirige al home page
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Titulo: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            
            id="inputCreatePost"
            name="title"
            placeholder="(Ej. Titulo...)"
          />
          <label>Contenido: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
           
            id="inputCreatePost"
            name="postText"
            placeholder="(Ej.de posteo...)"
          />

          <button type="submit"> Crear Entrada</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;