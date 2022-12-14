import React from 'react'
import {
  useCreateAppointmentMutation
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';

const AppointmentAdd = ({newAppointment, show, setShow}) => {
    const [createAppointment] = useCreateAppointmentMutation();
    const dispatch = useDispatch();
    const handleSubmit = async (appointment) => {
        await createAppointment(appointment);
        dispatch(addToast({message: "Cita creada correctamente", type: "success"}));
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