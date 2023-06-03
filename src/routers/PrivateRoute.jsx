//import { useContext } from "react";
//import { AuthContext } from "../auth/authContext";
import { Navigate } from "react-router-dom";
import {PropTypes } from "prop-types";
import { useSelector } from "react-redux";


export const PrivateRoute = ({children}) => {
  
  const {uid} = useSelector(state=>state.auth);

  //sustituir 
  // const {user} = useContext(AuthContext);
  // por
  // const {uid} = useSelector(state=>state.auth);
  // se lee el state del login (seteado o sea,diferente de null) a traves de ui en vez de user.logged  


   //si usuario no-autenticado no deja navegar a ninguna otra pagina.si lo intenta por el Browser se redirecciona a login
  return   uid ? children : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes={
  children: PropTypes.array.isRequired,
}

