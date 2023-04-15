import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat';
const firebaseConfig = {
    apiKey: "AIzaSyC5EzbEqJlPePhOsuoXtC9dwzsM_R_3NSc",
    authDomain: "whatsapp-next-2a03d.firebaseapp.com",
    projectId: "whatsapp-next-2a03d",
    storageBucket: "whatsapp-next-2a03d.appspot.com",
    messagingSenderId: "345187283959",
    appId: "1:345187283959:web:0d84fadfb7042fa6b834f2",
    measurementId: "G-5EJTQV333L"
  };

const app  = !firebase.apps.length ?
firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore()

const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }