import { db, doc, setDoc } from "../firebase.js";

document.getElementById("form-marca").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombreMarca = document.getElementById("nombre-marca").value;
  const refDoc = doc(db, "marcas", nombreMarca);
  await setDoc(refDoc, { name: nombreMarca });
  document.getElementById("form-marca").reset();

  //recargame la pagina
  window.location.reload();
});
