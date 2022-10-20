import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment/moment";
import { ErrorMessage } from "@hookform/error-message";
import Calendario from "_components/Calendario";
import {dateToHuman} from "../_helpers/localizeDate";

const AppointmentForm = ({appointmentData, handleAppointment}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required("Id del paciente es requerido"),
    dateAppointmentStart: Yup.date().required("Fecha de la cita es requerida"),
    dateAppointmentEnd: Yup.date().required("Fecha de la cita es requerida"),
    status: Yup.string().required("Estado de la cita es requerido"),
    observations: Yup.string().required("Observaciones de la cita es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { control, register, watch, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if(appointmentData){
      reset({ ...appointmentData, dateAppointmentStart: dateToHuman(appointmentData.dateAppointmentStart), dateAppointmentEnd: dateToHuman(appointmentData.dateAppointmentEnd)})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentData]);

  const onSubmit = data => {
    handleAppointment(data);
  };

  const handleSelectDate = ({start, end}) => {
    reset({
      ...watch(),
      dateAppointmentStart: dateToHuman(start),
      dateAppointmentEnd: dateToHuman(end),
    });
  }

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
            <input type="hidden" {...register("patientId")} value={appointmentData.patient.id} />
          </div>
          <div className="form-group">
            <Calendario handleSelectDate={handleSelectDate} editDate={appointmentData?.dateAppointmentStart} />
            <input type="text" name="dateAppointmentStart" className="form-control" {...register("dateAppointmentStart")} />
            <input type="text" name="dateAppointmentEnd" className="form-control" {...register("dateAppointmentEnd")} />
          </div>
          <div className="form-group">
            <label>Estatus</label>
            <select className="form-control" {...register("status")}>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <div className="invalid-feedback">{errors.status?.message}</div>
          </div>
          <div className="form-group">
            <label>Observations</label>
            <textarea {...register("observations")} className={`form-control ${errors.observations ? "is-invalid" : ""}`} />
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
