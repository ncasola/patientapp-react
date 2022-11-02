import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import SelectPatients from "_components/SelectPatients";

const AppointmentForm = ({ appointmentData, handleAppointment }) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required("Id del paciente es requerido"),
    dateAppointmentStart: Yup.date().required("Fecha de la cita es requerida"),
    dateAppointmentEnd: Yup.date().required("Fecha de la cita es requerida"),
    status: Yup.string().required("Estado de la cita es requerido"),
    observations: Yup.string().required(
      "Observaciones de la cita es requerida"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (appointmentData) {
      reset(appointmentData);
    }
  }, [appointmentData, reset]);

  const onSubmit = (data) => {
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
        <div class="row g-3">
          <div class="col">
            <div className="form-group">
              <input
                type="hidden"
                name="dateAppointmentStart"
                {...register("dateAppointmentStart")}
              />
              <input
                type="hidden"
                name="dateAppointmentEnd"
                {...register("dateAppointmentEnd")}
              />
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col">
            <div className="form-group">
              <label>Paciente</label>
              <select className="form-control" name="patientId" {...register("patientId")}>
                <option value="">Seleccione un paciente</option>
                <SelectPatients />
              </select>
              <div className="invalid-feedback">{errors.patientId?.message}</div>
            </div>
          </div>
          <div class="col">
            <div className="form-group">
              <label>Estatus</label>
              <select className="form-control" {...register("status")}>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
              </select>
              <div className="invalid-feedback">{errors.status?.message}</div>
            </div>
          </div>
          <div className="form-group mb-4">
            <label>Observations</label>
            <textarea
              {...register("observations")}
              className={`form-control ${
                errors.observations ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.observations?.message}
            </div>
          </div>
        </div>
        <div class="d-grid gap-2">
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
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
