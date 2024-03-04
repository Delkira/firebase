import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDiNFzVJ5lq6Rh0lbkr7kuwfCEdNGYgjY4",
  authDomain: "motocicletas-c0f61.firebaseapp.com",
  databaseURL: "https://motocicletas-c0f61-default-rtdb.firebaseio.com", // Asegúrate de que esta URL es correcta
  projectId: "motocicletas-c0f61",
  storageBucket: "motocicletas-c0f61.appspot.com",
  messagingSenderId: "536600879864",
  appId: "1:536600879864:web:6f7099b803fb981501510d",
  measurementId: "G-BG578K52TK",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app); // Inicializa Firebase Database

export function createData(path, data) {
  set(ref(db, path), data);
}

export async function readData(path) {
  const snapshot = await get(ref(db, path));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
}

export function updateData(path, data) {
  update(ref(db, path), data);
}

export function deleteData(path) {
  remove(ref(db, path));
}
