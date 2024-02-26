import { db, getDocs, collection } from "../firebase.js";

export async function poblarMarcas() {
  const marcasSnapshot = await getDocs(collection(db, "marcas"));
  const tablaMarcas = document
    .getElementById("tabla-marca")
    .getElementsByTagName("tbody")[0];
  marcasSnapshot.forEach((doc) => {
    const fila = tablaMarcas.insertRow();
    const celdaMarca = fila.insertCell(0);
    const celdaEditar = fila.insertCell(1);
    const celdaEliminar = fila.insertCell(2);

    celdaMarca.textContent = doc.data().name;
    celdaEditar.innerHTML = `<button class="btn btn-primary" onclick="editarMarca('${doc.id}')">Editar</button>`;
    celdaEliminar.innerHTML = `<button class="btn btn-danger" onclick="eliminarMarca('${doc.id}')">Eliminar</button>`;
  });
}

poblarMarcas();
