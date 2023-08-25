import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBF5bSxy_R-JTcGkpR-yxPWgtwlhC0b0ZQ",
    authDomain: "virtual-suitcase-backend.firebaseapp.com",
    projectId: "virtual-suitcase-backend",
    storageBucket: "virtual-suitcase-backend.appspot.com",
    messagingSenderId: "135950245140",
    appId: "1:135950245140:web:ff1a660c8e491bdafa7601"
  };


//init firebase app
initializeApp(firebaseConfig)

//init service
export const db = getFirestore()

//auth
// export const auth = getAuth();
