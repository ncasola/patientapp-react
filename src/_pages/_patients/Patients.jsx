import React from "react";
import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "_store/patient.api";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SubHeader from "_components/_layout/SubHeader";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Row, Col } from "react-bootstrap";

const Patients = () => {
  // states
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [columnText, setColumnText] = useState("");
  const [searchData, setSearchData] = useState({ column: "", value: "" });
  const { data, error, isLoading } = useGetPatientsQuery({
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
      name: "Apellido",
      selector: (row) => row.lastname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Telefono",
      selector: (row) => row.phone,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <ButtonGroup>
          <Button
            variant="primary"
            size="sm"
            as={Link}
            to={`/patient/${row.id}`}
            id={`view-${row.id}`}
          >
            <FontAwesomeIcon icon="eye" />
          </Button>
          <Button
            variant="warning"
            size="sm"
            as={Link}
            to={`/patient/edit/${row.id}`}
            id={`edit-${row.id}`}
          >
            <FontAwesomeIcon icon="edit" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
            id={`delete-${row.id}`}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  // hooks
  const [deletePatient] = useDeletePatientMutation();
  const dispatch = useDispatch();
  // functions
  const handleDelete = async (id) => {
    await deletePatient(id);
    dispatch(
      addToast({
        message: "Paciente eliminado",
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
    setSearchData({ column: columnText, value: filterText });
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
    <div className="row mt-4 gy-5">
      <div className="col-12">
        <SubHeader title="Pacientes" ruta="/" />
        <div className="form_container">
          <div className="row">
            <div className="col-2">
              <Button variant="primary" as={Link} to="/patient/add">
                <FontAwesomeIcon icon="plus" /> Nuevo paciente
              </Button>
            </div>
            <div className="col-10">
              <Form onSubmit={searchForm}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Select
                      onChange={(e) => setColumnText(e.target.value)}
                      aria-label="Columnas"
                    >
                      <option value="">Buscar por...</option>
                      <option value="name">Nombre</option>
                      <option value="lastname">Apellidos</option>
                      <option value="email">Email</option>
                      <option value="phone">Telefono</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      aria-label="Buscar"
                      placeholder="Buscar"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button variant="primary" type="submit">
                      <FontAwesomeIcon icon="search" /> Buscar
                    </Button>
                    <Button
                      className="ms-2"
                      variant="warning"
                      onClick={() => cleanSearch()}
                    >
                      <FontAwesomeIcon icon="times" /> Limpiar
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </div>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
