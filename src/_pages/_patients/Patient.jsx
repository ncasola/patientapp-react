import { useGetPatientQuery } from "_store/patient.api";
import { useGetAppointmentsByUserQuery } from "_store/appointment.api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SubHeader from "_components/_layout/SubHeader";
import { dateToHuman } from "_helpers/localizeDate";
import AppointmentEdit from "_pages/_appointment/AppointmentEdit";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export { Patient };

function Patient() {
  const params = useParams();
  const [idModal, setIdModal] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { data, error, isLoading } = useGetPatientQuery(params.id);
  const { data: appointments, error: errorAppointments, isLoading: isLoadingAppointments } = useGetAppointmentsByUserQuery(params.id);
  const handleEdit = (appointment) => {
    setIdModal(appointment.id);
    setShowModalEdit(true);
  };

  return (
    <div className="row mt-4 gy-5">
      <div className="col-12">
        <SubHeader title="Paciente" ruta="/patients" />
        <AppointmentEdit id={idModal} show={showModalEdit} setShow={setShowModalEdit} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <div className="form_container">
            <div className="row">
              <div className="col-6">
                <h3 className="text-center">Datos del paciente</h3>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th scope="row">Nombre</th>
                      <td>{data.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Apellidos</th>
                      <td>{data.lastname}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{data.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Teléfono</th>
                      <td>{data.phone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Dirección</th>
                      <td>{data.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <h3 className="text-center">
                  Citas del paciente
                </h3>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th scope="row">Cita</th>
                      <th scope="row">Inicio</th>
                      <th scope="row">Final</th>
                      <th scope="row">Estado</th>
                      <th scope="row">Acciones</th>
                    </tr>
                    { isLoadingAppointments && <p>Loading...</p> }
                    { errorAppointments && <p>{errorAppointments}</p> }
                    {appointments && appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <th scope="row">Cita nº {appointment.id}</th>
                        <td>{dateToHuman(appointment.dateAppointmentStart)}</td>
                        <td>{dateToHuman(appointment.dateAppointmentEnd)}</td>
                        <td>{appointment.status}</td>
                        <td>
                        <ButtonGroup>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(appointment)}>
                            <FontAwesomeIcon icon="edit" />
                          </Button>
                        </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Patient;
