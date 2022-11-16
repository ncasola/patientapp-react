import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { Form, Button, Col } from "react-bootstrap";

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
    const role = (userData && userData.roles) ? userData.roles[0].id : 2;
    if(userData) {
      reset({...userData, role: role});
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Col}>
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <Form.Control
              name="name"
              type="text"
              {...register("name")}
              aria-label="Nombre"
              className={`${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="lastname">Apellido</Form.Label>
            <Form.Control
              name="lastname"
              type="text"
              {...register("lastname")}
              aria-label="Apellido"
              className={`${errors.lastname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              {...register("email")}
              aria-label="Email"
              className={`${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              {...register("password")}
              aria-label="password"
              className={`${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="role">Rol</Form.Label>
            <select
              name="role"
              {...register("role")}
              aria-label="role"
              className={`${errors.role ? "is-invalid" : ""}`}
            >
              <option value="1">Administrador</option>
              <option value="2">Usuario</option>
            </select>
            <div className="invalid-feedback">{errors.role?.message}</div>
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

export default UserForm;
