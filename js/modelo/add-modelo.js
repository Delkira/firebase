import { db, doc, setDoc } from "../firebase.js";

document.getElementById("form-modelo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombreModelo = document.getElementById("nombre-modelo").value;
  const marcaModelo = document.getElementById("marca-modelo").value;
  const refDoc = doc(db, "modelos", nombreModelo);
  await setDoc(refDoc, { name: nombreModelo, marca: marcaModelo });
  document.getElementById("form-modelo").reset();
  //recargame la pagina
  window.location.reload();
});