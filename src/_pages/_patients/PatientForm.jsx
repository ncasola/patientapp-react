import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { Form, Button, Col } from "react-bootstrap";

const PatientForm = ({patientData, handlePatient}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if(patientData){
      reset(patientData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData]);

 const onSubmit = data => {
    handlePatient(data);
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
          <Form.Group as={Col}>
            <Form.Label htmlFor="name-input">Nombre</Form.Label>
            <Form.Control
              name="name"
              type="text"
              {...register("name")}
              id="name-input"
              aria-label="Nombre"
              className={`${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="lastname-input">Apellido</Form.Label>
            <Form.Control
              name="lastname"
              type="text"
              {...register("lastname")}
              id="lastname-input"
              aria-label="Apellido"
              className={`${errors.lastname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="email-input">Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              {...register("email")}
              id="email-input"
              aria-label="Email"
              className={`${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="phone-input">Teléfono</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              {...register("phone")}
              id="phone-input"
              aria-label="Teléfono"
              className={`${errors.phone ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="address-input">Dirección</Form.Label>
            <Form.Control
              name="address"
              type="text"
              {...register("address")}
              id="address-input"
              aria-label="Dirección"
              className={`${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="city-input">Ciudad</Form.Label>
            <Form.Control
              name="city"
              type="text"
              {...register("city")}
              id="city-input"
              aria-label="Ciudad"
              className={`${errors.city ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.city?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="state-input">Estado</Form.Label>
            <Form.Control
              name="state"
              type="text"
              {...register("state")}
              id="state-input"
              aria-label="Estado"
              className={`${errors.state ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.state?.message}</div>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor="country-input">País</Form.Label>
            <Form.Control
              name="country"
              type="text"
              {...register("country")}
              id="country-input"
              aria-label="País"
              className={`${errors.country ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.country?.message}</div>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor="zip-input">Código Postal</Form.Label>
            <Form.Control
              name="zip"
              type="text"
              {...register("zip")}
              id="zip-input"
              className={`${errors.zip ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.zip?.message}</div>
          </Form.Group>
          <div className="d-grid gap-2 mt-4">
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="primary"
            size="lg"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Enviar
          </Button>
          </div>

        </Form>
        </>
  );
};

export default PatientForm;
