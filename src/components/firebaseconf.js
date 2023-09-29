// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMYQCuDNhoJmHWXJfpQBTuUPKjnohBiAM",
  authDomain: "movies-book-c477a.firebaseapp.com",
  projectId: "movies-book-c477a",
  storageBucket: "movies-book-c477a.appspot.com",
  messagingSenderId: "247597398538",
  appId: "1:247597398538:web:ed96d1b222d8df7c20bdf3",
  measurementId: "G-JK3PFQN3H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth()

export{app,auth}