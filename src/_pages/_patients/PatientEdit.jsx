import React from 'react'
import {
  useUpdatePatientMutation,
  useGetPatientQuery,
} from "_store/patient.api";
import PatientForm from './PatientForm';
import { history } from '_helpers';
import { useParams } from 'react-router-dom';
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import SubHeader from '_components/_layout/SubHeader';

const PatientEdit = () => {
    const [updatePatient, { isLoading, error }] = useUpdatePatientMutation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = useGetPatientQuery(id);
    const handleSubmit = async (newPatient) => {
        await updatePatient({id, ...newPatient});
        dispatch(addToast({message: "Paciente actualizado correctamente", type: "success"}));
        history.navigate('/patients');
    }
    return (
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Editar Paciente" ruta="/patients" />
            <div className="form_container">
            {data && <PatientForm patientData={data} handlePatient={handleSubmit} />}
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default PatientEdit