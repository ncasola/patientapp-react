import React from "react";
import { useGetUserQuery } from "_store/user.api";
import { useParams } from "react-router-dom";
import { Row, Col, Table, Container } from "react-bootstrap";
import SubHeader from '_components/_layout/SubHeader';

const User = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetUserQuery(params.id);
    return (
      <Container fluid className="mt-4">
        <SubHeader title="Usuario" ruta="/users" />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <Container className="custom_container">
            <Row>
              <Col sm>
                <h3 className="text-center">Datos del usuario</h3>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellidos</th>
                      <th scope="col">Email</th>
                      <th scope="col">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.lastname}</td>
                      <td>{data.email}</td>
                      <td>{data.roles[0].name}</td>
                    </tr>
                  </tbody>
                  </Table>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
  );
};

export default User;
