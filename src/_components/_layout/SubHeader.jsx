import React from "react";
import { Link } from "react-router-dom";
import { Button, Col } from "react-bootstrap";

const SubHeader = ({ ruta, title }) => {
  return (
    <Col className="mb-4">
      <Link to={ruta}>
        <Button variant="light" className="button-custom">
          Volver
        </Button>
      </Link>
      <h1 className="custom_header d-inline-flex ms-4">{title}</h1>
    </Col>
  );
};

export default SubHeader;
