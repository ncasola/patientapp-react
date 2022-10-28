import React from 'react'
import {
  useCreateAppointmentMutation
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { addToast } from "_store/toast.slice";
import { history } from '_helpers';
import {useLocation} from 'react-router-dom';
import SubHeader from '_components/_layout/SubHeader';

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
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Añadir Cita" ruta="/appointments" />
            <div className="form_container">
            <AppointmentForm appointmentData={{patient: patient}} handleAppointment={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default AppointmentAdd