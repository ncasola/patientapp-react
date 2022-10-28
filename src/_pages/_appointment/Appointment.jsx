import {useGetAppointmentQuery} from '_store/appointment.api'
import { useParams } from "react-router-dom";
import {dateToHuman} from "_helpers/localizeDate";
import SubHeader from '_components/_layout/SubHeader';
export { Appointment };

function Appointment() {
    const params = useParams();
    const { data, error, isLoading } = useGetAppointmentQuery(params.id);

    return (
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Cita" ruta="/appointments" />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <div className='form_container'>
                <p>{data.id}</p>
                <p>{data.patient.name}</p>
                <p>{dateToHuman(data.dateAppointmentStart) }</p>
                <p>{dateToHuman(data.dateAppointmentEnd) }</p>
                <p>{data.status}</p>
            </div>}
        </div>
        </div>
    );
}

export default Appointment