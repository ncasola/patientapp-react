import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              name="lastname"
              type="text"
              {...register("lastname")}
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label>Telefono</label>
            <input
              name="phone"
              type="text"
              {...register("phone")}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>
          <div className="form-group">
            <label>Direccion</label>
            <input
              name="address"
              type="text"
              {...register("address")}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input
              name="city"
              type="text"
              {...register("city")}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.city?.message}</div>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input
              name="state"
              type="text"
              {...register("state")}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.state?.message}</div>
          </div>

          <div className="form-group">
            <label>Pais</label>
            <input
              name="country"
              type="text"
              {...register("country")}
              className={`form-control ${errors.country ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.country?.message}</div>
          </div>

          <div className="form-group">
            <label>Codigo Postal</label>
            <input
              name="zip"
              type="text"
              {...register("zip")}
              className={`form-control ${errors.zip ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.zip?.message}</div>
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

export default PatientForm;
