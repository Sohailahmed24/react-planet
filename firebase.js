

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC56Aj71Lm9dsXo4ZcJGblGxsUr6OS0n1k",
  authDomain: "noonproject-c76dc.firebaseapp.com",
  projectId: "noonproject-c76dc",
  storageBucket: "noonproject-c76dc.appspot.com",
  messagingSenderId: "129848374950",
  appId: "1:129848374950:web:aca86b86e9fbc016fba667"
};




export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
