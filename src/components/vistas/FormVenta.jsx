import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { createData, readData } from "../../config/firebase"; // Asegúrate de importar la función desde tu archivo de configuración de Firebase

const SaleForm = () => {
  const [id, setId] = useState(Date.now());
  const [clientName, setClientName] = useState("");
  const [productId, setProductId] = useState(""); // Cambia productName a productId
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      const usersData = await readData("users");
      const productsData = await readData("products");
      if (usersData) {
        const usersArray = Object.keys(usersData).map((key) => ({
          id: key,
          ...usersData[key],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
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
    fetchUsersAndProducts();
  }, []);

  const handleProductChange = (e) => {
    const selectedProduct = products.find(
      (product) => product.id === e.target.value
    );

    console.log(selectedProduct);
    if (selectedProduct && selectedProduct.cost) {
      setProductId(selectedProduct.id); // Actualiza productId en lugar de productName
      setCategory(selectedProduct.category);
      setPrice(selectedProduct.cost);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crear un objeto venta con los datos del formulario
    const sale = {
      id: id,
      clientName: clientName,
      productName: products.find((product) => product.id === productId)?.name, // Busca el nombre del producto basado en productId
      category: category,
      price: price,
    };
    // Enviar la venta a Firebase
    createData(`sales/${id}`, sale);
    // Limpiar el formulario y generar un nuevo ID
    setId(Date.now());
    setClientName("");
    setProductId(""); // Limpia productId en lugar de productName
    setCategory("");
    setPrice("");
  };

  return (
    <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del cliente</Form.Label>
          <Form.Select
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Select value={productId} onChange={handleProductChange}>
            {" "}
            // Establece el valor a productId
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <p>Categoría: {category}</p>
        <p>Precio: {price}</p>

        <Button variant="primary" type="submit">
          Añadir venta
        </Button>
      </Form>
    </Container>
  );
};

export default SaleForm;
