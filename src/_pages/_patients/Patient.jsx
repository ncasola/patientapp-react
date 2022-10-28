import {useGetPatientQuery} from '_store/patient.api'
import { useParams } from "react-router-dom";
import SubHeader from '_components/_layout/SubHeader';
export { Patient };

function Patient() {
    const params = useParams();
    const { data, error, isLoading } = useGetPatientQuery(params.id);

    return (
       <div className="row mt-4 gy-5">
       <div className="col-12">
       <SubHeader title="Paciente" ruta="/patients" />
       {isLoading && <p>Loading...</p>}
       {error && <p>{error}</p>}
       {data && <div>
                <p>{data.name}</p>
                <p>{data.lastname}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>
            </div>}
   </div>
   </div>
    );
}

export default Patient