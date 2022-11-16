import React from "react";
import {
  useUpdatePatientMutation,
  useGetPatientQuery,
} from "_store/patient.api";
import PatientForm from "./PatientForm";
import { useParams } from "react-router-dom";
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import SubHeader from "_components/_layout/SubHeader";
import { Container } from "react-bootstrap";

const PatientEdit = () => {
  const [updatePatient, { isLoading, error }] = useUpdatePatientMutation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useGetPatientQuery(id);
  const handleSubmit = async (newPatient) => {
    await updatePatient({ id, ...newPatient });
    dispatch(
      addToast({
        message: "Paciente actualizado correctamente",
        type: "success",
      })
    );
  };
  return (
    <Container fluid className="mt-4">
      <SubHeader title="Editar Paciente" ruta="/patients" />
      <Container className="custom_container">
        <PatientForm patientData={data} handlePatient={handleSubmit} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Container>
    </Container>
  );
};

export default PatientEdit;
