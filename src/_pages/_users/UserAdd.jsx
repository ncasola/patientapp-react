import React from 'react'
import {
  useCreateUserMutation
} from "_store/user.api";
import UserForm from './UserForm';
import { addToast } from "_store/toast.slice";
import { history } from '_helpers';
import SubHeader from '_components/_layout/SubHeader';

const UserAdd = () => {
    const [createUser, { isLoading, error }] = useCreateUserMutation();
    const handleSubmit = async (user) => {
        await createUser(user);
        addToast({message: 'Usuario guardado', type: 'success', title: 'Exito'});
        history.push("/users");
    }
    return (
        <div className="row mt-4 gy-5">
            <div className="col-12">
            <SubHeader title="Añadir Paciente" ruta="/users" />
            <div className="form_container">
            <UserForm userData={{}} handleUser={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    )
}

export default UserAdd