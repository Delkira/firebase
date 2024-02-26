import { collection, getDocs, db } from "../firebase.js";

export async function poblarUsuarios() {
  const usuariosSnapshot = await getDocs(collection(db, "usuarios"));
  const tablaUsuarios = document.getElementById("tabla-usuario").getElementsByTagName('tbody')[0];
  usuariosSnapshot.forEach((doc) => {
    const fila = tablaUsuarios.insertRow();
    const celdaUsuario = fila.insertCell(0);
    const celdaEditar = fila.insertCell(1);
    const celdaEliminar = fila.insertCell(2);

    celdaUsuario.textContent = doc.data().name;
    celdaEditar.innerHTML = `<button class="btn btn-primary" onclick="editarUsuario('${doc.id}')">Editar</button>`;
    celdaEliminar.innerHTML = `<button class="btn btn-danger" onclick="eliminarUsuario('${doc.id}')">Eliminar</button>`;
  });
}

poblarUsuarios();