import React from 'react'
import {
  useCreateAppointmentMutation
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { addToast } from "_store/toast.slice";
import Modal from 'react-bootstrap/Modal';

const AppointmentAdd = ({startDate, endDate, show, setShow}) => {
    const [createAppointment] = useCreateAppointmentMutation();
    const newAppointment = {
        dateAppointmentStart: startDate,
        dateAppointmentEnd: endDate,
    }
    const handleSubmit = async (appointment) => {
        await createAppointment(appointment);
        addToast({message: 'Paciente guardado', type: 'success', title: 'Exito'});
        setShow(false);
    }
    const handleClose = () => setShow(false)

    return (
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Añadir Cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AppointmentForm appointmentData={newAppointment} handleAppointment={handleSubmit} />
            </Modal.Body>
          </Modal>
    )
}

export default AppointmentAdd