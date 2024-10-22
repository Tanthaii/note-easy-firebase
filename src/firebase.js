import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt7sievqtWRdbGldqLy6GG2fvJif-oDP0",
  authDomain: "note-easy-5e8d3.firebaseapp.com",
  projectId: "note-easy-5e8d3",
  storageBucket: "note-easy-5e8d3.appspot.com",
  messagingSenderId: "644888795246",
  appId: "1:644888795246:web:a7e4c71caaa882be07ae7f",
  measurementId: "G-62N5Y5KTDK",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app); 
export const db = getFirestore(app); 
