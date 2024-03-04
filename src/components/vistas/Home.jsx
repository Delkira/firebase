import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { readData } from "../../config/firebase"; // Asegúrate de importar la función desde tu archivo de configuración de Firebase

const Home = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await readData("sales");
      if (salesData) {
        const salesArray = Object.keys(salesData).map((key) => ({
          id: key,
          ...salesData[key],
        }));
        setSales(salesArray);
      } else {
        setSales([]);
      }
    };
    fetchSales();
  }, []);

  return (
    <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de la venta</th>
            <th>Nombre del cliente</th>
            <th>Nombre del producto</th>
            <th>Categoría</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.clientName}</td>
              <td>{sale.productName}</td>
              <td>{sale.category}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;