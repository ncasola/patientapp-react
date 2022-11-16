import { useGetAppointmentQuery } from "_store/appointment.api";
import { useParams } from "react-router-dom";
import { dateToHuman } from "_helpers/localizeDate";
import SubHeader from "_components/_layout/SubHeader";
import { Container, Row, Col } from "react-bootstrap";

export { Appointment };

function Appointment() {
  const params = useParams();
  const { data, error, isLoading } = useGetAppointmentQuery(params.id);

  return (
    <Container fluid className="mt-4">
      <SubHeader title="Cita" ruta="/appointments" />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <Container className="custom_container">
          <Row>
            <Col sm>
              <p>{data.id}</p>
              <p>{data.patient.name}</p>
              <p>{dateToHuman(data.dateAppointmentStart)}</p>
              <p>{dateToHuman(data.dateAppointmentEnd)}</p>
              <p>{data.status}</p>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default Appointment;
