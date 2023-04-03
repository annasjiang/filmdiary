import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4JoS0HRvOYHgGf15GdSrVRtw3nnGK7js",
  authDomain: "film-diary-a93cf.firebaseapp.com",
  projectId: "film-diary-a93cf",
  storageBucket: "film-diary-a93cf.appspot.com",
  messagingSenderId: "1055949210781",
  appId: "1:1055949210781:web:9232c05704a58fb1b70074",
  measurementId: "G-3TKKXKYFP7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  logout,
};