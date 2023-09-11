//import Swal from "sweetalert2";
import Swal from "sweetalert2";
import { types } from "../R_types/types";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

//LOGIN
export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

//LOGIN_MERN
export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      //localStorage.setItem("name", body.name);
     // localStorage.setItem("uid", body.uid);

      localStorage.setItem("token-init-date", new Date().getTime());
      //  localStorage.setItem("uid", body.uid);
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );

      // dispatch(finishLoading());
    } else {
      Swal.fire("Error", body.msg, "error");

      // .catch((e) => {
      //   dispatch(finishLoading());
      //   Swal.fire("Error", e.message, "error");
      // });
    }
  };
};

//REGISTRO_MERN
export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { email, password, name },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");

      // .catch((e) => {
      //   dispatch(finishLoading());
      //   Swal.fire("Error", e.message, "error");
      // });
    }
  };
};

//****************************//
//START CHECKING_MERN
export const startChecking = () => {

  return async (dispatch) => {

    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,//localStorage.getItem("uid"),
          name:body.name,// localStorage.getItem("name"),
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

export function checkingFinish() {
  return {
    type: types.authCheckingFinish,
  };
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authLogout());
  };
};

export const authLogout = () => ({
  type: types.authLogout,
});

//**************************************** //*/

//ERRORS
export const setError = (err) => ({
  type: types.authSetError,
  payload: err,
});

export const removeError = () => ({
  type: types.authRemoveError,
});

/*


// //LOADING FLAG
// //START LOADING
// export const startLoading = () => ({
//   type: types.authStartLoading,
// });

// //FINISH LOADING
// export const finishLoading = () => ({
//   type: types.authFinishLoading,
// });



//login con usuario y contarseña
export const startWithLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    //ojo con auth y auth(), no devuelven los mismos metodos
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};

//registrarse con usuario y contarseña
export const startRegisterEmailPassword = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire("Error", e.message, "error");
      });
  };
};

//register-login con cuenta google
export const startLoginGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

//login
export const login = (uid, name) => ({
  type: types.authLogin,
  payload: {
    uid,
    name,
  },
});




export const logout = () => ({
  type: types.authLogout,
});

*/
