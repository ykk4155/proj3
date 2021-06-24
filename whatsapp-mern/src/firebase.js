/* eslint-disable no-unused-vars */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAN62J3wPD5TAiO5TyMgsb-9y8jnKCaeyA",
  authDomain: "whatsapp-82ae4.firebaseapp.com",
  projectId: "whatsapp-82ae4",
  storageBucket: "whatsapp-82ae4.appspot.com",
  messagingSenderId: "991123702725",
  appId: "1:991123702725:web:aab9c74b48e389fa73c1ac",
  measurementId: "G-RF37LH08GH"
};

//auth part
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;