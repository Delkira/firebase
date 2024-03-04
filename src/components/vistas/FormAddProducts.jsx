import React, { useState, useEffect } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import {
  createData,
  readData,
  updateData,
  deleteData,
} from "../../config/firebase"; // Asegúrate de importar las funciones desde tu archivo de configuración de Firebase

const FormAddProducts = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

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

    const fetchProducts = async () => {
      const productsData = await readData("products");
      if (productsData) {
        const productsArray = Object.keys(productsData).map((key) => ({
          id: key,
          ...productsData[key],
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      id: id,
      name: name,
      cost: cost,
      category: category,
    };

    alert(product)
    createData(`products/${id}`, product);
    setId("");
    setName("");
    setCost("");
    setCategory("");
  };

  const handleEdit = (productId) => {
    const productName = prompt("Ingrese el nuevo nombre del producto:");
    const productCost = prompt("Ingrese el nuevo costo del producto:");
    if (productName && productCost) {
      updateData(`products/${productId}`, {
        name: productName,
        cost: productCost,
      });
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este producto?")) {
      deleteData(`products/${productId}`);
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

        <Form.Group className="mb-3">
          <Form.Label>Costo</Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Añadir producto
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID del producto</th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.cost}</td>
              <td>{product.category}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(product.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
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

export default FormAddProducts;
