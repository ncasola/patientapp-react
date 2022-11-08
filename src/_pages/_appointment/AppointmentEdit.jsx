import React from 'react'
import {
  useUpdateAppointmentMutation,
  useGetAppointmentQuery,
  useDeleteAppointmentMutation,
} from "_store/appointment.api";
import AppointmentForm from './AppointmentForm';
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppointmentEdit = ({id, show, setShow}) => {
    const [updateAppointment] = useUpdateAppointmentMutation();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const { data } = useGetAppointmentQuery(id);
    const dispatch = useDispatch();
    const handleSubmit = async (newAppointment) => {
        await updateAppointment({id, ...newAppointment});
        dispatch(addToast({message: "Cita actualizada correctamente", type: "success"}));
        setShow(false);
    }
    const handleDelete = async () => {
        await deleteAppointment(id);
        dispatch(addToast({message: "Cita eliminada correctamente", type: "success"}));
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
            <Button variant="danger" size='lg' onClick={handleDelete}>
              <FontAwesomeIcon icon="trash" /> Eliminar
            </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AppointmentEdit