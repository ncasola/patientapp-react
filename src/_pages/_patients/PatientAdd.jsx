import React from 'react'
import {
  useCreatePatientMutation
} from "_store/patient.api";
import PatientForm from './PatientForm';
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { history } from '_helpers';
import SubHeader from '_components/_layout/SubHeader';

const PatientAdd = () => {
    const [createPatient, { isLoading, error }] = useCreatePatientMutation();
    const dispatch = useDispatch();
    const handleSubmit = async (patient) => {
        await createPatient(patient);
        dispatch(addToast({message: "Paciente creado correctamente", type: "success"}));
        history.push("/patients");
    }
    return (
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Añadir Paciente" ruta="/patients" />
            <div className="form_container">
            <PatientForm patientData={{}} handlePatient={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default PatientAdd