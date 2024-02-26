import { collection, getDocs, db } from "../firebase.js";

async function populateVentas() {
  const ventasSnapshot = await getDocs(collection(db, "ventas"));
  const ventaTableBody = document.querySelector("#tabla-venta tbody");

  ventasSnapshot.forEach((doc) => {
    const row = ventaTableBody.insertRow();

    const modeloCell = row.insertCell();
    modeloCell.textContent = doc.data().modelo;

    const usuarioCell = row.insertCell();
    usuarioCell.textContent = doc.data().usuario;

    const editCell = row.insertCell();
    editCell.innerHTML = `<button class='btn btn-warning' onclick="editarVenta('${doc.id}')">Editar</button>`;

    const deleteCell = row.insertCell();
    deleteCell.innerHTML = `<button class='btn btn-danger' onclick="eliminarVenta('${doc.id}')">Eliminar</button>`;
  });
}

populateVentas();