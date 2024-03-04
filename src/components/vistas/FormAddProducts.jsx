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
      <Form onSubmit={handleSubmit}>{/* El resto de tu formulario... */}</Form>

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
