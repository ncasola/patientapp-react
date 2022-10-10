import {useGetPatientQuery} from '../_store/patient.slice'
import { useParams } from "react-router-dom";
export { Patient };

function Patient() {
    const params = useParams();
    const { data, error, isLoading } = useGetPatientQuery(params.id);

    return (
        <div>
            <h1>Patient</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <div>
                <p>{data.name}</p>
                <p>{data.lastname}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>
            </div>}
        </div>
    );
}

export default Patient