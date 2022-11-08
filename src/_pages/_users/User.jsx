import React from "react";
import { useGetUserQuery } from "_store/user.api";
import { useParams } from "react-router-dom";
import SubHeader from '_components/_layout/SubHeader';

const User = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetUserQuery(params.id);
    return (
    <div className="row mt-4 gy-5">
      <div className="col-12">
        <SubHeader title="Usuario" ruta="/users" />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <div className="form_container">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">Datos del usuario</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellidos</th>
                      <th scope="col">Email</th>
                      <th scope="col">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.lastname}</td>
                      <td>{data.email}</td>
                      <td>{data.roles[0].name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
