// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCVgrMO089JFdaOCypgtdZvanQ5Fosmok",
  authDomain: "fer201-cef24.firebaseapp.com",
  projectId: "fer201-cef24",
  storageBucket: "fer201-cef24.appspot.com",
  messagingSenderId: "306946104122",
  appId: "1:306946104122:web:547d6771d6393574a84e03",
  measurementId: "G-MYRD2Y387Z",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
