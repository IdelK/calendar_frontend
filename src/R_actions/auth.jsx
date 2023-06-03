import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../R_types/types";
import { finishLoading, startLoading } from "./ui";

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
  type: types.login,
  payload: {
    uid,
    name,
  },
});


export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
   
  };
};

export const logout = () => ({
  type: types.logout,
});





//en el tutorial estaba el segundo argumento como displayName
//pero en el authReducer esta como name
// export const login = (uid,displayName)=>({
// type :types.login,
//     payload:{
//         uid,
//         displayName
//     }
// })

//error
// WARNING in ./node_modules/firebase/firebase-auth.js Module Warning (from ./node_modules/source-map-loader/dist/cjs.js): Failed to parse source map from 'D:\programacion web\8-journalApp\node_modules\auth\dist\ [synthetic:es6\util\arrayiterator] ' file: Error: ENOENT: no such file o r directory, open 'D:\programacion web\8-journalApp\node_modules\auth\dist\ [synthetic:es6\util\arrayiterator] '

//soluttion
// If u don't want to see this warnings anymore a possible solution is add this fix editing the
//file node_modules/react-scripts/config/webpack.config.js,
//and pasting this after the line performance: false, //here paste// };};

//     ignoreWarnings: [
//       // Ignore warnings raised by source-map-loader.
//       // some third party packages may ship miss-configured sourcemaps, that interrupts the build
//       // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
//       /**
//        *
//        * @param {import('webpack').WebpackError} warning
//        * @returns {boolean}
//        */
//       function ignoreSourcemapsloaderWarnings(warning) {
//         return (
//           warning.module &&
//           warning.module.resource.includes('node_modules') &&
//           warning.details &&
//           warning.details.includes('source-map-loader')
//         );
//       },
//     ],
