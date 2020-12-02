import firebase from "firebase";
import "firebase/firestore";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBiEiZe_qCArWvK_gQcsDAsTczQRSJV6H0",
    authDomain: "sm41-49525.firebaseapp.com",
    databaseURL: "https://sm41-49525.firebaseio.com",
    projectId: "sm41-49525",
    storageBucket: "sm41-49525.appspot.com",
    messagingSenderId: "416240163320",
    appId: "1:416240163320:web:3ba3c7527736898d531e0d",
    measurementId: "G-2LDMQ2VBT3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const db = firebase.firestore();

export default {
  firebase,
  db
};
