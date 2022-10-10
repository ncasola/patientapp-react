import {useGetAppointmentQuery} from '../_store/appointment.slice'
import { useParams } from "react-router-dom";
export { Appointment };

function Appointment() {
    const params = useParams();
    const { data, error, isLoading } = useGetAppointmentQuery(params.id);

    return (
        <div>
            <h1>Citas</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <div>
                <p>{data.id}</p>
                <p>{data.idPatient}</p>
                <p>{data.dateAppointment}</p>
                <p>{data.timeAppointment}</p>
                <p>{data.status}</p>
            </div>}
        </div>
    );
}

export default Appointment