import React from 'react'
import {
  useCreateAppointmentMutation
} from "../_store/appointment.slice";
import AppointmentForm from './AppointmentForm';
import { addToast } from "../_store/toast.slice";
import { history } from '_helpers';
import {useLocation} from 'react-router-dom';

const AppointmentAdd = () => {
    const [createAppointment, { isLoading, error }] = useCreateAppointmentMutation();
    const location = useLocation();
    const patient = location.state.patientData;
    const handleSubmit = async (appointment) => {
        await createAppointment(appointment);
        addToast({message: 'Paciente guardado', type: 'success', title: 'Exito'});
        history.navigate('/appointments');
    }

    return (
        <>
            <h1>Añadir Cita</h1>
            <AppointmentForm appointmentData={{patient: patient}} handleAppointment={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default AppointmentAdd