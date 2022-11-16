import React from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import SelectPatients from "_components/SelectPatients";
import { Form, Button, Row, Col } from "react-bootstrap";

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
  const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-3">
          <Col sm>
            <Form.Group>
              <Form.Control
                type="hidden"
                name="dateAppointmentStart"
                {...register("dateAppointmentStart")}
              />
              <Form.Control
                type="hidden"
                name="dateAppointmentEnd"
                {...register("dateAppointmentEnd")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3">
        <Col sm>
        <Form.Group>
              <Form.Label htmlFor="patientId">Paciente</Form.Label>
              <Controller
                name="patientId"
                control={control}
                render={({ field }) => (
                  <SelectPatients
                    name="patientId"
                    handleChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="patientId"
                render={({ message }) => (
                  <div className="invalid-feedback d-block">{message}</div>
                )}
              />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group>
              <Form.Label>Estatus</Form.Label>
              <Form.Select
              data-testid="status"
              className="form-control" 
              name="status" 
              role="combobox" 
              {...register("status")}>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
              </Form.Select>
              <div className="invalid-feedback">{errors.status?.message}</div>
            </Form.Group>
            </Col>
            <Col xs={12}>
          <Form.Group>
            <Form.Label>Observations</Form.Label>
            <Form.Control
              as="textarea"
              name="observations"
              {...register("observations")}
              className={`form-control ${
                errors.observations ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.observations?.message}
            </div>
          </Form.Group>
          </Col>
        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={isSubmitting}
            type="submit"
variant="primary"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Enviar
          </Button>
        </div>
        </Row>
      </Form>
    </>
  );
};

export default AppointmentForm;
