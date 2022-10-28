import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";
import { removeToast } from "_store/toast.slice";
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastList = () => {
    const toasts = useSelector((state) => state.toast.toasts);
    const dispatch = useDispatch();
  return (
    <ToastContainer position="bottom-start">
    {toasts.map((toast) => (
      <Toast
        key={toast.id}
        onClose={() => dispatch(removeToast(toast.id))}
        delay={3000}
        bg={toast.type}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">{toast.title}</strong>
        </Toast.Header>
        <Toast.Body>
          <p>{toast.text}</p>
        </Toast.Body>
      </Toast>
    ))}
    </ToastContainer>
  )
}

export default ToastList