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
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Editar Usuario" ruta="/users" />
            <div className="form_container">
            {data && <UserForm userData={data} handleUser={handleSubmit} />}
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default UserEdit