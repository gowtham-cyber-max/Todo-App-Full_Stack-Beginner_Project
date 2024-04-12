// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm_CZ1LqT-aywWxWK7UvubSq-9n2rhiXs",
  authDomain: "todo-app-d7fdf.firebaseapp.com",
  projectId: "todo-app-d7fdf",
  storageBucket: "todo-app-d7fdf.appspot.com",
  messagingSenderId: "304833515160",
  appId: "1:304833515160:web:0adf876056342488dacaed",
  measurementId: "G-JW6N9RNLS4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const gauth = new GoogleAuthProvider();
