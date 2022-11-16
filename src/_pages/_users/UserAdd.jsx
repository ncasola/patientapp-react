import React from "react";
import { useCreateUserMutation } from "_store/user.api";
import UserForm from "./UserForm";
import { addToast } from "_store/toast.slice";
import { useDispatch } from "react-redux";
import { history } from "_helpers";
import SubHeader from "_components/_layout/SubHeader";
import { Container } from "react-bootstrap";

const UserAdd = () => {
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (user) => {
    await createUser(user);
    dispatch(
      addToast({ message: "Usuario creado correctamente", type: "success" })
    );
    history.push("/users");
  };
  return (
    <Container fluid className="mt-4">
      <SubHeader title="Añadir Usuario" ruta="/users" />
      <Container className="custom_container">
        <UserForm userData={{}} handleUser={handleSubmit} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Container>
    </Container>
  );
};

export default UserAdd;
