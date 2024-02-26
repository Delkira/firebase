import { db, doc, setDoc } from "../firebase.js";

document.getElementById("form-usuario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombreUsuario = document.getElementById("nombre-usuario").value;
  const refDoc = doc(db, "usuarios", nombreUsuario);
  await setDoc(refDoc, { name: nombreUsuario });
  document.getElementById("form-usuario").reset();
});