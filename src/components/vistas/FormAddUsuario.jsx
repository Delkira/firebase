import React, { useState, useEffect } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import {
  createData,
  readData,
  updateData,
  deleteData,
} from "../../config/firebase"; // Asegúrate de importar las funciones desde tu archivo de configuración de Firebase

const FormAddUsuario = () => {
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await readData("users");
      if (usersData) {
        const usersArray = Object.keys(usersData).map((key) => ({
          cedula: key,
          ...usersData[key],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      cedula: cedula,
      name: name,
      direccion: direccion,
      correo: correo,
    };
    createData(`users/${cedula}`, user);
    setCedula("");
    setName("");
    setDireccion("");
    setCorreo("");
  };

  const handleEdit = (userCedula) => {
    const userName = prompt("Ingrese el nuevo nombre del usuario:");
    const userDireccion = prompt("Ingrese la nueva dirección del usuario:");
    const userCorreo = prompt("Ingrese el nuevo correo del usuario:");
    if (userName && userDireccion && userCorreo) {
      updateData(`users/${userCedula}`, {
        name: userName,
        direccion: userDireccion,
        correo: userCorreo,
      });
    }
  };

  const handleDelete = (userCedula) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este usuario?")) {
      deleteData(`users/${userCedula}`);
    }
  };

  return (
    <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>{/* El resto de tu formulario... */}</Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.cedula}>
              <td>{user.cedula}</td>
              <td>{user.name}</td>
              <td>{user.direccion}</td>
              <td>{user.correo}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(user.cedula)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.cedula)}
                  className="ms-2"
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FormAddUsuario;
