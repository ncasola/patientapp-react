import Patients from "./Patients";
import Patient from "./Patient";
import PatientEdit from "./PatientEdit";
import PatientAdd from "./PatientAdd";

import { Route } from "react-router-dom";
import { PrivateRoute } from "_components/_layout/PrivateRoute";

const patientArray =  [
      <Route
        // patients page to list all patients
        path="/patients"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />,
      <Route
        // patient page to show a single patient
        path="/patient/:id"
        element={
          <PrivateRoute>
            <Patient />
          </PrivateRoute>
        }
      />,
      <Route
        // patient page to edit a single patient
        path="/patient/edit/:id"
        element={
          <PrivateRoute>
            <PatientEdit />
          </PrivateRoute>
        }
      />,
      <Route
        // patient page to add a single patient
        path="/patient/add"
        element={
          <PrivateRoute>
            <PatientAdd />
          </PrivateRoute>
        }
      />
    ];

export default patientArray;