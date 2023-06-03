
import  firebase  from "firebase/app";
import  "firebase/firebase-firestore";
import  "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYHl4MHRjhgwIeV9MPTPRvUlrrH4UIoKw",
  authDomain: "react-app-cursos-a9a26.firebaseapp.com",
  projectId: "react-app-cursos-a9a26",
  storageBucket: "react-app-cursos-a9a26.appspot.com",
  messagingSenderId: "1066652443620",
  appId: "1:1066652443620:web:d956c0cf7c478f775e5df1"
};

// Initialize Firebase

//const app = 
firebase.initializeApp(firebaseConfig);
const db =  firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
  
    db,
    googleAuthProvider,
    firebase
}














// https://console.firebase.google.com/u/0/project/react-app-cursos-a9a26/overview?hl=es

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBYHl4MHRjhgwIeV9MPTPRvUlrrH4UIoKw",
//   authDomain: "react-app-cursos-a9a26.firebaseapp.com",
//   projectId: "react-app-cursos-a9a26",
//   storageBucket: "react-app-cursos-a9a26.appspot.com",
//   messagingSenderId: "1066652443620",
//   appId: "1:1066652443620:web:d956c0cf7c478f775e5df1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);