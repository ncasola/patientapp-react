import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";
import { removeToast } from "_store/toast.slice";
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastList = () => {
    const toasts = useSelector((state) => state.toast.toasts);
    const dispatch = useDispatch();
  return (
    <ToastContainer position="bottom-start" className="p-3">
    {toasts.map((toast) => (
      <Toast
        key={toast.id}
        onClose={() => dispatch(removeToast(toast.id))}
        delay={3000}
        bg={toast.type}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{toast.title ? toast.title : "Notificación"}</strong>
          <small>Hace un segundo</small>
        </Toast.Header>
        <Toast.Body>
          <p data-testid="toast">{toast.text}</p>
        </Toast.Body>
      </Toast>
    ))}
    </ToastContainer>
  )
}

export default ToastList