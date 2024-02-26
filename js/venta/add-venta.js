import { doc, setDoc, db } from "../firebase.js";

document.getElementById("form-venta").addEventListener("submit", async (e) => {
  e.preventDefault();

  const modeloVenta = document.getElementById("modelo-venta").value;
  const usuarioVenta = document.getElementById("usuario-venta").value;

  const docRef = doc(db, "ventas", `${usuarioVenta}-${modeloVenta}`);

  try {
    await setDoc(docRef, { modelo: modeloVenta, usuario: usuarioVenta, vendida: true});

    console.log("Document written with ID: ", docRef.id);
    alert("¡Venta añadida exitosamente!");
    document.getElementById("form-venta").reset();

    //recargame la pagina
    window.location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});