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

    console.log(user)
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
 
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Añadir usuario
          </Button>
        </Form>


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
