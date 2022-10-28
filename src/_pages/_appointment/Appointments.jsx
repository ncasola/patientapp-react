import React from 'react'
import {useGetAppointmentsQuery, useDeleteAppointmentMutation} from '_store/appointment.api'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { addToast } from '_store/toast.slice';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { DateTime, Settings } from 'luxon'
import SubHeader from '_components/_layout/SubHeader';

const Appointments = () => {
    const [totalRows, setTotalRows] = useState(0);
    const [size, setSize] = useState(10);
    const [pageNum, setPageNum] = useState(0);
    const { data, error, isLoading } = useGetAppointmentsQuery({pageNum, size});
    Settings.defaultZone = 'Etc/GMT';
    Settings.defaultLocale = 'es-ES';
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const dispatch = useDispatch();
    const handleRemoveButton = async (id) => {
        await deleteAppointment(id);
        dispatch(addToast({ message: 'Cita eliminada', type: 'success', title: 'Eliminado' }));
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Paciente',
            selector: row => row.patient.name,
        },
        {
            name: 'Fecha',
            // date in format day and hour
            selector: row => DateTime.fromISO(row.dateAppointmentStart).toFormat('dd LLL HH:mm') + ' - ' + DateTime.fromISO(row.dateAppointmentEnd).toFormat('HH:mm'),
        },
        {
            name: 'Estatus',
            selector: row => row.status,
        },
        {
            cell: row => 
            <button className='btn btn-danger' onClick={() => handleRemoveButton(row.id)}>X</button>,
            button: true,
        },
        {
            cell: row => <Link className='btn btn-info' to={`/appointment/edit/${row.id}`}>Editar</Link>,
            button: true,
        },
        {
            cell: row => <Link className='btn btn-info' to={`/appointment/${row.id}`}>Ver</Link>,
            button: true,
        }
    ];

    const handlePageChange = page => {
        setPageNum(page);
    };

	const handlePerRowsChange = async (newPerPage, page) => {	
        setSize(newPerPage);
        setPageNum(page);
	};

    useEffect(() => {
        if (data) {
            setTotalRows(data.totalItems);
        }
    }, [data]);

  return (
                <div className="row mt-4 gy-5">
                <div className="col-12">
                <SubHeader title="Citas" ruta="/" />
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className="form_container">
                {data && <DataTable
            columns={columns}
            data={data.items}
			progressPending={isLoading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
            highlightOnHover
        />}
        </div>
            </div>
            </div>
  )
}

export default Appointments