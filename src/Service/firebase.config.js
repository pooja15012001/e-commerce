// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdNkCMZ1Zld2JGOmaqRre41QPz4D7ivpw",
  authDomain: "firebse-3b55f.firebaseapp.com",
  databaseURL: "https://firebse-3b55f-default-rtdb.firebaseio.com",
  projectId: "firebse-3b55f",
  storageBucket: "firebse-3b55f.appspot.com",
  messagingSenderId: "469352137477",
  appId: "1:469352137477:web:7ba0373bedf882b6f9ad6c",
  measurementId: "G-DEWZVDPKKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firebase = getFirestore(app);

export { app, storage, firebase };
// const database = getDatabase(app);
// export default database
// export const db = getDatabase(app);
// export const storage = getStorage(app);

// export const signIn = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };
// export const signUp = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };
