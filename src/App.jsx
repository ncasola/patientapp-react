import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { history } from "_helpers";
import { PrivateRoute } from "_components";
import { Home } from "_pages/home";
import { Login } from "_pages/login";
import { Header } from "_components/_layout/Header";
import ToastList from "_components/ToastList";
import PatientRoutes from "_pages/_patients/PatientRoutes";
import AppointmentRoutes from "_pages/_appointment/AppointmentRoutes";
/* PLOP_INJECT_IMPORT */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export { App };

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  library.add(fas);
  return (
<>
      <Header />
      <div class="container app">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          {PatientRoutes}
          {AppointmentRoutes}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        <ToastList />
      </div>
    </>
  );
}
