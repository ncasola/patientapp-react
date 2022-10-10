import React from 'react';

import Appointments from "./Appointments";
import Appointment from "./Appointment";
import AppointmentEdit from "./AppointmentEdit";
import AppointmentAdd from "./AppointmentAdd";

import { Route } from "react-router-dom";
import { PrivateRoute } from "../_components/_layout/PrivateRoute";

const routeArray = [
      <Route
        // appointments page to list all appointments
        path="/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />,
      <Route
        // appointment page to show a single appointment
        path="/appointment/:id"
        element={
          <PrivateRoute>
            <Appointment />
          </PrivateRoute>
        }
      />,
      <Route
        // appointment page to edit a single appointment
        path="/appointment/edit/:id"
        element={
          <PrivateRoute>
            <AppointmentEdit />
          </PrivateRoute>
        }
      />,
      <Route
        // appointment page to add a single appointment
        path="/appointment/add"
        element={
          <PrivateRoute>
            <AppointmentAdd />
          </PrivateRoute>
        }
      />
    ];

export default routeArray;