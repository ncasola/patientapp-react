import React from 'react'
import {
  useUpdateAppointmentMutation,
  useGetAppointmentQuery,
  useDeleteAppointmentMutation,
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { addToast } from "_store/toast.slice";
import { Button, Modal } from 'react-bootstrap';

const AppointmentEdit = ({id, show, setShow}) => {
    const [updateAppointment] = useUpdateAppointmentMutation();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const { data } = useGetAppointmentQuery(id);
    const handleSubmit = async (newAppointment) => {
        await updateAppointment({id, ...newAppointment});
        addToast({message: 'Cita guardada', type: 'success', title: 'Exito'});
        setShow(false);
    }
    const handleDelete = async () => {
        await deleteAppointment(id);
        addToast({message: 'Cita eliminada', type: 'success', title: 'Exito'});
        setShow(false);
    }

    const handleClose = () => setShow(false)

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {data && <AppointmentForm appointmentData={data} handleAppointment={handleSubmit} />} 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" size='lg' onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AppointmentEdit