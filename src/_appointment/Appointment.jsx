import {useGetAppointmentQuery} from '../_store/appointment.slice'
import { useParams } from "react-router-dom";
import {dateToHuman} from "../_helpers/localizeDate";
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
                <p>{data.patient.name}</p>
                <p>{dateToHuman(data.dateAppointmentStart) }</p>
                <p>{dateToHuman(data.dateAppointmentEnd) }</p>
                <p>{data.status}</p>
            </div>}
        </div>
    );
}

export default Appointment