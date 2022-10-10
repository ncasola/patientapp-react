import React from 'react'
import {
  useCreatePatientMutation
} from "../_store/patient.slice";
import PatientForm from './PatientForm';
import { addToast } from "../_store/toast.slice";
import { history } from '_helpers';

const PatientAdd = () => {
    const [createPatient, { isLoading, error }] = useCreatePatientMutation();
    const handleSubmit = async (patient) => {
        await createPatient(patient);
        addToast({message: 'Paciente guardado', type: 'success', title: 'Exito'});
        history.push("/patients");
    }
    return (
        <>
            <h1>Añadir Paciente</h1>
            <PatientForm patientData={{}} handlePatient={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default PatientAdd