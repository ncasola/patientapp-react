import React from 'react'
import {
  useUpdateAppointmentMutation,
  useGetAppointmentQuery,
} from "../_store/appointment.slice";
import AppointmentForm from './AppointmentForm';
import { history } from '_helpers';
import { useParams } from 'react-router-dom';
import { addToast } from "../_store/toast.slice";

const AppointmentEdit = () => {
    const [updateAppointment, { isLoading, error }] = useUpdateAppointmentMutation();
    const { id } = useParams();
    const { data } = useGetAppointmentQuery(id);
    const handleSubmit = async (newAppointment) => {
        await updateAppointment({id, ...newAppointment});
        addToast({message: 'Paciente guardado', type: 'success', title: 'Exito'});
        history.navigate('/appointments');
    }

    return (
        <>
            <h1>Editar Cita</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <AppointmentForm appointmentData={data} handleAppointment={handleSubmit} />}
        </>
    )
}

export default AppointmentEdit