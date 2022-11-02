import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAppointmentsQuery } from '_store/appointment.api';
import { useGetPatientsQuery } from '_store/patient.api';
import { dateToHuman } from '_helpers/localizeDate';
import { useEffect } from 'react';
export { Home };

function Home() {
    // const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const pageNum = 0;
    const size = 10;
    const searchData = { column: "", value: "" };
    const { data: appointments } = useGetAppointmentsQuery({ pageNum, size, searchData });
    const { data: patients } = useGetPatientsQuery({ pageNum, size, searchData });

    useEffect(() => {
        // order patients by name
        if(patients) {
            patients.items.sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            });
        }   
    }, [patients]);

    return (
        <div className="row mt-4 gy-5">
        <div className="col-12 form_container">
            <h1 className="text-center">Bienvenido {authUser.name}</h1>
            <div className="row">
                <div className="col-6">
                    <h3 className="text-center">Ultimas citas <Button variant="primary" size='sm' href="/appointments">Ver todas</Button></h3>
                    <table className="table table-striped">
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
                    </table>
                    </div>
                    <div className="col-6">
                    <h3 className="text-center">Ultimos pacientes <Button variant="primary" size="sm" href="/patients">Ver todos</Button></h3>
                    <table className="table table-striped">
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
                    </table>
                    </div>  
        </div>
        </div>
        </div>
    );
}

