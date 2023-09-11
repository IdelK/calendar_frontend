// import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { AuthRouter } from "./AuthRouter";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startChecking } from "../R_actions/authActions";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);
  

  //1-cuando  refresco se borra el uid del local storage,es como si al volver a renderizas se lalmara un clear .loaclstorage
  //en localstorage se borra el token pero no el token-init-date
  //en el useeffect estoy usando una varable que no esta en local storage que es uid
  useEffect(() => {
    dispatch(startChecking()); 
    //2-la variable user se debe leer y pasar al start login,
    //esto permtite que cdo refresh no vaya al login y
    //cdo logout deben limparse para que vaya al login

    //3-co hago login se genera sate de name,uid y en local se guarda token
    //cdo hago startChecking con fectConToken se borra todo(??por que )

    //el response del endp[oint /renew no da en su body NADQAAAAAAAAAAAAAAAAAAA]
  }, [dispatch]);

  if (checking) {
    return <h1>wait...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA ANIDADA */}

        {/* RUTA PUBLICA:no requiere usuario autenticado */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              {" "}
              <AuthRouter />{" "}
            </PublicRoute>
          }
        />

        {/* RUTA PRIVADA:requiere usuario autenticado*/}
        <Route
          exact
          path="/*"
          element={
            <PrivateRoute>
              {" "}
              <CalendarScreen /> {/* CalendarScreen*/}
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// //const { uid } = useSelector((state) => state.auth);
// const [checking, setChecking] = useState(true);
// const [isLoggedIn, setIsLoggedIn] = useState(true);
// const dispatch =useDispatch();
// const { uid } = useSelector((state) => state.auth);

// const tokeApp= localStorage.getItem("token");

// console.log(tokeApp);
// console.log(uid);

// useEffect(() => {

//   if (tokeApp) {
//     setIsLoggedIn(true);
//     dispatch(startLogin('fredes@gmail.com','123456'));

//   }
//   else {
//     setIsLoggedIn(false);
//   }

//   setChecking(false);
// }, [tokeApp,dispatch, setChecking, isLoggedIn]);

// //****!!!!cdo recargo el navegador muestro el cartel espere en vez de LoginScreen!!!***
// if (checking) {
//   return <h1>wait...</h1>;
//
