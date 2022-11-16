import React from "react";
import { useCreatePatientMutation } from "_store/patient.api";
import PatientForm from "./PatientForm";
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { history } from "_helpers";
import SubHeader from "_components/_layout/SubHeader";
import { Container } from "react-bootstrap";

const PatientAdd = () => {
  const [createPatient, { isLoading, error }] = useCreatePatientMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (patient) => {
    await createPatient(patient);
    dispatch(
      addToast({ message: "Paciente creado correctamente", type: "success" })
    );
    history.push("/patients");
  };
  return (
    <Container fluid className="mt-4">
      <SubHeader title="Añadir Paciente" ruta="/patients" />
      <Container className="custom_container">
        <PatientForm patientData={{}} handlePatient={handleSubmit} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Container>
    </Container>
  );
};

export default PatientAdd;
