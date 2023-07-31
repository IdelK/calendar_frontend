import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../R_actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


 
export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //de momento se va a relaizar el loggin con firebase hasta que entre mern
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
       

      } else {
        setIsLoggedIn(false); 
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, isLoggedIn]);

  //****!!!!cdo recargo el navegador muestro el cartel espere en vez de LoginScreen!!!***
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
