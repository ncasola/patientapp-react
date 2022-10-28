import React from 'react'
import {useGetPatientsQuery, useDeletePatientMutation} from '_store/patient.api'
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { addToast } from '_store/toast.slice';
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from 'react';
import SubHeaderComponent from '_components/_layout/SubHeaderComponent';
import debounce from 'lodash.debounce';
import SubHeader from '_components/_layout/SubHeader';

const Patients = () => {
    // states
    const [totalRows, setTotalRows] = useState(0);
    const [size, setSize] = useState(10);
    const [pageNum, setPageNum] = useState(0);
    const [filterText, setFilterText] = useState('');
    const { data, error, isLoading } = useGetPatientsQuery({pageNum, size, filterText});
    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Nombre',
            selector: row => row.name,
        },
        {
            name: 'Apellido',
            selector: row => row.lastname,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Telefono',
            selector: row => row.phone,
        },
        {
            cell: row => 
            <button className='btn btn-danger' onClick={() => handleRemoveButton(row.id)}>X</button>,
            button: true,
        },
        {
            cell: row => <Link className='btn btn-info' to={`/patient/edit/${row.id}`}>Editar</Link>,
            button: true,
        },
        {
            cell: row => <Link className='btn btn-info' to={`/patient/${row.id}`}>Ver</Link>,
            button: true,
        },
        {
            cell: row => <button className='btn btn-info' onClick={() => toAppointment(row)}>Citar</button>,
            button: true,
        }
    ];
    // hooks
    const navigate = useNavigate();
    const [deletePatient] = useDeletePatientMutation();
    const dispatch = useDispatch();
    // functions
    const handleRemoveButton = async (id) => {
        await deletePatient(id);
        dispatch(addToast({ message: 'Paciente eliminado', type: 'success', title: 'Eliminado' }));
    }
    const toAppointment = (row) => {
        navigate('/appointment/add', {state: {patientData: row}});
    }

    const handlePageChange = page => {
        setPageNum(page);
    };

	const handlePerRowsChange = (newPerPage, page) => {	
        setSize(newPerPage);
        setPageNum(page);
	};
    
    const debouncedResults = useMemo(() => {
        return debounce((e) => setFilterText(e.target.value), 300);
    }, []);

    useEffect(() => {
        if (data) {
            setTotalRows(data.totalItems);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

  return (
    <div className="row mt-4 gy-5">
    <div className="col-12">
    <SubHeader title="Pacientes" ruta="/" />
    <div className="form_container">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
            subHeaderComponent={<SubHeaderComponent onFilter={debouncedResults} />}
            subHeader
            subHeaderAlign="left"
            persistTableHead
        />}
        </div>
    </div>
    </div>
  )
}

export default Patients