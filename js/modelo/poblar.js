import { collection, getDocs, db } from "../firebase.js";

export async function poblarModelos() {
  const modelosSnapshot = await getDocs(collection(db, "modelos"));
  const tablaModelos = document.getElementById("tabla-modelo").getElementsByTagName('tbody')[0];
  modelosSnapshot.forEach((doc) => {
    const fila = tablaModelos.insertRow();
    const celdaModelo = fila.insertCell(0);
    const celdaEditar = fila.insertCell(1);
    const celdaEliminar = fila.insertCell(2);

    celdaModelo.textContent = doc.data().name;
    celdaEditar.innerHTML = `<button class="btn btn-primary" onclick="editarModelo('${doc.id}')">Editar</button>`;
    celdaEliminar.innerHTML = `<button class="btn btn-danger" onclick="eliminarModelo('${doc.id}')">Eliminar</button>`;
  });
}

poblarModelos();