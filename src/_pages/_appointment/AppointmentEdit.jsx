import React from 'react'
import {
  useUpdateAppointmentMutation,
  useGetAppointmentQuery,
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { history } from '_helpers';
import { useParams } from 'react-router-dom';
import { addToast } from "_store/toast.slice";
import SubHeader from '_components/_layout/SubHeader';

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
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Editar Cita" ruta="/appointments" />
            <div className="form_container">
            {data && <AppointmentForm appointmentData={data} handleAppointment={handleSubmit} />}
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default AppointmentEdit