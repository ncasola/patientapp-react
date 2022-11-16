import React from "react";
import { useUpdateProfileMutation } from "_store/user.api";
import UserForm from "./UserForm";
import { useSelector, useDispatch } from "react-redux";
import { history } from "_helpers";
import { addToast } from "_store/toast.slice";
import { authActions } from "_store/auth.slice";
import SubHeader from "_components/_layout/SubHeader";
import { Container } from "react-bootstrap";

const UserProfile = () => {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { id } = authUser;
  const handleSubmit = async (newUser) => {
    await updateProfile({ id, ...newUser });
    dispatch(
      addToast({ message: "Perfil actualizado correctamente", type: "success" })
    );
    dispatch(authActions.setCredentials(newUser));
    history.navigate("/");
  };
  return (
    <Container fluid className="mt-4">
      <SubHeader title="Editar Perfil" ruta="/users" />
      <Container className="custom_container">
        <UserForm userData={authUser} handleUser={handleSubmit} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Container>
    </Container>
  );
};

export default UserProfile;
