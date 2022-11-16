import React from 'react'
import {
  useUpdateUserMutation,
  useGetUserQuery,
} from "_store/user.api";
import UserForm from './UserForm';
import { history } from '_helpers';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToast } from "_store/toast.slice";
import SubHeader from '_components/_layout/SubHeader';
import { Container } from "react-bootstrap";

const UserEdit = () => {
    const [updateUser, { isLoading, error }] = useUpdateUserMutation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = useGetUserQuery(id);
    const handleSubmit = async (newUser) => {
        await updateUser({id, ...newUser});
        dispatch(addToast({message: "Usuario actualizado correctamente", type: "success"}));
        history.navigate('/users');
    }
    return (
        <Container fluid className="mt-4">
        <SubHeader title="Editar Usuario" ruta="/users" />
        <Container className="custom_container">
          <UserForm userData={data} handleUser={handleSubmit} />
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </Container>
      </Container>
    )
}

export default UserEdit