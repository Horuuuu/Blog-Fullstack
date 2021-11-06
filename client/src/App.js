import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import ChangePassword from "./pages/ChangePassword"

import { AuthContext } from "./Contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({//estado global para saber si está autentificado
    username: "",//estado inicial
    id: 0,
    status: false,//boolean
  });

  useEffect(() => {//para que se muestre la respuesta inmediatamente despues que cargue 
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {//espera la respuesta y ejecuta lo siguiente
        if (response.data.error) {//si el usuario no esta registrado
          setAuthState({ ...authState, status: false });//desestructurado, el objeto+el cambio de estado
        } else {//authstate pero con el cambio solo de estado a falso
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
//funcion de cerrar sesion
  const logout = () => {
    localStorage.removeItem("accessToken");//elimina el token de acceso
    setAuthState({ username: "", id: 0, status: false });//y cambia el estado a falso
  };
    //todos los componentes y paginas en el contexto tienen acceso a las variables en el value
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router> 
          <div className="navbar">
            <div className="links">
              {!authState.status ? (//si el estado es falso o no está registrado
                <>
                  <Link to="/login"> Iniciar sesion</Link>
                  <Link to="/registration"> Registrate</Link>
                </>
              ) : (//sino
                <>
                  <Link to="/"> Inicio</Link>
                  <Link to="/createpost"> Crear una entrada</Link>
                </>//y muestra boton de cerrar sesion
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Cerrar sesion</button>}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
