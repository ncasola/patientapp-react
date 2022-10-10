import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import Calendario from "_components/Calendario";

const AppointmentForm = ({appointmentData, handleAppointment}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    idPatient: Yup.string().required("Id del paciente es requerido"),
    dateAppointment: Yup.date().required("Fecha de la cita es requerida"),
    status: Yup.string().required("Estado de la cita es requerido"),
    observations: Yup.string().required("Observaciones de la cita es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { control, register, watch, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if(appointmentData){
      reset(appointmentData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentData]);

  const onSubmit = data => {
    handleAppointment(data);
  };
  return (
    <>
        <ErrorMessage
          errors={errors}
          name="multipleErrorInput"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Paciente</label>
            <input type="text" className="form-control" value={appointmentData.patient.name} disabled />
          </div>
          <div className="form-group">
            <Calendario />
            <input type="text" className="form-control" value={appointmentData.dateAppointment} />
          </div>
          <div className="form-group">
            <label>Estatus</label>
            <input
              name="status"
              type="text"
              {...register("status")}
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.status?.message}</div>
          </div>
          <div className="form-group">
            <label>observations</label>
            <input
              name="observations"
              type="text"
              {...register("observations")}
              className={`form-control ${errors.observations ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.observations?.message}</div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Enviar
          </button>
        </form>
        </>
  );
};

export default AppointmentForm;
