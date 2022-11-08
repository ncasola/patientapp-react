import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

const UserForm = ({userData, handleUser}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    console.log(userData);
    if(userData) {
      reset({...userData, role: userData.roles[0].id});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

 const onSubmit = data => {
    handleUser(data);
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
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select
              name="role"
              {...register("role")}
              className={`form-control ${errors.role ? "is-invalid" : ""}`}
            >
              <option value="1">Administrador</option>
              <option value="2">Usuario</option>
            </select>
            <div className="invalid-feedback">{errors.role?.message}</div>
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

export default UserForm;
