import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { history } from "_helpers";
import { Nav, PrivateRoute } from "_components";
import { Home } from "home";
import { Login } from "login";
import { removeToast } from "./_store/toast.slice";
import PatientRoutes from "_patients/PatientRoutes";
import AppointmentRoutes from "_appointment/AppointmentRoutes";

import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";
import ToastContainer from 'react-bootstrap/ToastContainer';

export { App };

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();


  return (
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            // home page
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {PatientRoutes}
          {AppointmentRoutes}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
      </div>
    </div>
  );
}
