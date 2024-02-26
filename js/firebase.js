// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE3FKNAOFqu8ftuzeUhwsCm7Je0aMGycM",
  authDomain: "motos-4915a.firebaseapp.com",
  projectId: "motos-4915a",
  storageBucket: "motos-4915a.appspot.com",
  messagingSenderId: "720384952459",
  appId: "1:720384952459:web:db0f847be71093acf8ec8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, doc, setDoc, getDocs, collection, deleteDoc, updateDoc };
