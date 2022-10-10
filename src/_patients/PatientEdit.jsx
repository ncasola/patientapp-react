import React from 'react'
import {
  useUpdatePatientMutation,
  useGetPatientQuery,
} from "../_store/patient.slice";
import PatientForm from './PatientForm';
import { history } from '_helpers';
import { useParams } from 'react-router-dom';
import { addToast } from "../_store/toast.slice";

const PatientEdit = () => {
    const [updatePatient, { isLoading, error }] = useUpdatePatientMutation();
    const { id } = useParams();
    const { data } = useGetPatientQuery(id);
    const handleSubmit = async (newPatient) => {
        await updatePatient({id, ...newPatient});
        addToast({message: 'Paciente guardado', type: 'success', title: 'Exito'});
        history.navigate('/patients');
    }
    return (
        <>
            <h1>Editar Paciente</h1>
            <PatientForm patientData={data} handlePatient={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default PatientEdit