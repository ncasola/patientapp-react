import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "_store/user.api";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SubHeader from "_components/_layout/SubHeader";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Row, Col, Container } from "react-bootstrap";

const Users = () => {
  // states
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [columnText, setColumnText] = useState("");
  const [searchData, setSearchData] = useState({column: "", value: ""});
  const { data, error, isLoading } = useGetUsersQuery({
    pageNum,
    size,
    searchData,
  });
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Apellidos",
      selector: (row) => row.lastname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Rol",
      selector: (row) => row.roles[0].name,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <ButtonGroup>
          <Button variant="primary" size="sm" as={Link} to={`/user/${row.id}`}>
            <FontAwesomeIcon icon="eye" />
          </Button>
          <Button
            variant="warning"
            size="sm"
            as={Link}
            to={`/user/edit/${row.id}`}
          >
            <FontAwesomeIcon icon="edit" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  // hooks
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();
  // functions
  const handleDelete = async (id) => {
    await deleteUser(id);
    dispatch(
      addToast({
        message: "Usuario eliminado",
        type: "danger",
        title: "Eliminado",
      })
    );
  };

  const handlePageChange = (page) => {
    setPageNum(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setSize(newPerPage);
    setPageNum(page);
  };

  const searchForm = (e) => {
    e.preventDefault();
    setSearchData({column: columnText, value: filterText});
  };

  const cleanSearch = () => {
    setFilterText("");
    setSearchData({ column: "", value: "" });
  };

  useEffect(() => {
    if (data) {
      setTotalRows(data.totalItems);
    }
  }, [data]);

  return (
    <Container className="mt-4">
        <SubHeader title="Usuarios" ruta="/" />
        <Container className="custom_container">
        <Row className="g-3">
        <Col sm>
              <Button variant="primary" as={Link} to="/user/add">
                <FontAwesomeIcon icon="plus" /> Nuevo usuario
              </Button>
            </Col>
            <Col sm>
              <Form onSubmit={searchForm}>
                <Row className="g-3">
                  <Form.Group as={Col}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setColumnText(e.target.value)}
                    >
                      <option value="">Buscar por...</option>
                      <option value="name">Nombre</option>
                      <option value="lastname">Apellidos</option>
                      <option value="email">Email</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} sm>
                    <Form.Control
                      type="text"
                      placeholder="Buscar"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm>
                  <ButtonGroup>
                    <Button size="sm" variant="primary" type="submit">
                      <FontAwesomeIcon icon="search" /> Buscar
                    </Button>
                    <Button size="sm" variant="warning"
                      onClick={() => cleanSearch()}
                    >
                      <FontAwesomeIcon icon="times" /> Limpiar
                    </Button>
                    </ButtonGroup>
                  </Form.Group>
                  </Row>
              </Form>
            </Col>
          </Row>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {data && (
            <DataTable
              columns={columns}
              data={data.items}
              progressPending={isLoading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              highlightOnHover
              persistTableHead
            />
          )}
        </Container>
    </Container>
  );
};

export default Users;
