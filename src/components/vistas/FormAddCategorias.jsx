import React, { useState, useEffect } from "react";
import { Table, Button, Container, Form } from "react-bootstrap"; // Asegúrate de importar Form desde react-bootstrap
import {
  createData,
  readData,
  updateData,
  deleteData,
} from "../../config/firebase"; // Asegúrate de importar las funciones desde tu archivo de configuración de Firebase

const FormAddCategorias = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await readData("categories");
      if (categoriesData) {
        const categoriesArray = Object.keys(categoriesData).map((key) => ({
          id: key,
          ...categoriesData[key],
        }));
        setCategories(categoriesArray);
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crear un objeto categoría con los datos del formulario
    const category = {
      id: id,
      name: name,
    };
    // Enviar la categoría a Firebase
    createData(`categories/${id}`, category);
    // Limpiar el formulario
    setId("");
    setName("");
  };

  const handleEdit = (categoryId) => {
    const categoryName = prompt("Ingrese el nuevo nombre de la categoría:");
    if (categoryName) {
      updateData(`categories/${categoryId}`, { name: categoryName });
    }
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta categoría?")) {
      deleteData(`categories/${categoryId}`);
    }
  };

  return (
    <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
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

        <Button variant="primary" type="submit">
          Añadir categoría
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID de la categoría</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(category.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category.id)}
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

export default FormAddCategorias;
