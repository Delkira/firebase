import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/vistas/Home";
import FormAddCategorias from "./components/vistas/FormAddCategorias";
import FormAddProducts from "./components/vistas/FormAddProducts";
import FormAddUsuario from "./components/vistas/FormAddUsuario";
import FormVenta from "./components/vistas/FormVenta";

const App = () => {
  return (
    <Router>
      <Navbar bg="light" variant="light">
        <Nav className="mx-auto">
          <Button as={Link} to="/" variant="outline-primary" className="m-1">
            Home
          </Button>
          <Button
            as={Link}
            to="/add-categoria"
            variant="outline-primary"
            className="m-1"
          >
            Añadir Categoría
          </Button>
          <Button
            as={Link}
            to="/add-producto"
            variant="outline-primary"
            className="m-1"
          >
            Añadir Producto
          </Button>
          <Button
            as={Link}
            to="/add-usuario"
            variant="outline-primary"
            className="m-1"
          >
            Añadir Usuario
          </Button>
          <Button
            as={Link}
            to="/venta"
            variant="outline-primary"
            className="m-1"
          >
            Venta
          </Button>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-categoria" element={<FormAddCategorias />} />
        <Route path="/add-producto" element={<FormAddProducts />} />
        <Route path="/add-usuario" element={<FormAddUsuario />} />
        <Route path="/venta" element={<FormVenta />} />
      </Routes>
    </Router>
  );
};

export default App;
