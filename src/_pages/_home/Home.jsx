import { Button, Row, Col, Table, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAppointmentsQuery } from '_store/appointment.api';
import { useGetPatientsQuery } from '_store/patient.api';
import { dateToHuman } from '_helpers/localizeDate';
import { Link } from 'react-router-dom';

export { Home };

function Home() {
    // const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const pageNum = 0;
    const size = 10;
    const searchData = { column: "", value: "" };
    const { data: appointments } = useGetAppointmentsQuery({ pageNum, size, searchData });
    const { data: patients } = useGetPatientsQuery({ pageNum, size, searchData });

    return (
        <Container fluid className="mt-4 gy-5">
            <h1 className="text-center">Bienvenido {authUser.name}</h1>
            <Row>
                <Col sm className='custom_container'>
                    <h3 className="text-center">Ultimas citas
                    <br></br>
                    <Button variant="primary" size="sm" as={Link} to="/appointments">Ver todas</Button></h3>
                    <Table responsive data-testid="citas">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Fecha inicio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.items.map((appointment, index) => (
                                <tr key={appointment.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{appointment.patient.name}</td>
                                    <td>{dateToHuman(appointment.dateAppointmentStart)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Col>
                    <Col sm className='custom_container'>
                    <h3 className="text-center">Ultimos pacientes 
                    <br></br>
                    <Button variant="primary" size='sm' as={Link} to="/patients">Ver todos</Button></h3>
                    <Table responsive data-testid="pacientes">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients && patients.items.map((patient, index) => (
                                <tr key={patient.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{patient.name}</td>
                                    <td>{patient.lastname}</td>
                                    <td>{patient.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Col>  
        </Row>
        </Container>
    );
}

