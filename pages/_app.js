import { auth, db } from '@/firebase'
import '@/styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './Login'
import { useEffect } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function App({ Component, pageProps }) {
  const [user] = useAuthState(auth)
  useEffect(()=> {
    console.log("entering useFffect")

    if(user){
      console.log("updaing users Data")
      db.collection('users').doc(user.uid).set({
        email:user.email,
        lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        photoURL : user.photoURL
      } , {merge: true})
    }
  } , [])


  if(!user) return <Login/>
  return <Component {...pageProps} />
}
