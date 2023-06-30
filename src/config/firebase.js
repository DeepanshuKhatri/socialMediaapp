// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdek4PS1Mp-5PVRvk9Dc5Stfvq-N6c9uA",
  authDomain: "social-media-app-1ea44.firebaseapp.com",
  projectId: "social-media-app-1ea44",
  storageBucket: "social-media-app-1ea44.appspot.com",
  messagingSenderId: "847380038752",
  appId: "1:847380038752:web:50ca88305e9852d4782f05",
  measurementId: "G-0L1NF4CX42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);