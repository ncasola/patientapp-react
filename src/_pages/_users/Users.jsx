import React from 'react'
import {useGetUsersQuery, useDeleteUserMutation} from '_store/user.api'
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { addToast } from '_store/toast.slice';
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from 'react';
import SubHeaderComponent from '_components/_layout/SubHeaderComponent';
import debounce from 'lodash.debounce';
import SubHeader from '_components/_layout/SubHeader';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Users = () => {
    // states
    const [totalRows, setTotalRows] = useState(0);
    const [size, setSize] = useState(10);
    const [pageNum, setPageNum] = useState(0);
    const [filterText, setFilterText] = useState('');
    const { data, error, isLoading } = useGetUsersQuery({pageNum, size, filterText});
    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Acciones',
            cell: row => 
            <ButtonGroup>
                <Button variant="primary" size="sm" as={Link} to={`/user/${row.id}`}>Ver</Button>
                <Button variant="primary" size="sm" as={Link} to={`/user/edit/${row.id}`}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>Eliminar</Button>
            </ButtonGroup>
        }
    ];
    // hooks
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation();
    const dispatch = useDispatch();
    // functions
    const handleDelete = async (id) => {
        await deleteUser(id);
        dispatch(addToast({ message: 'Usuario eliminado', type: 'success', title: 'Eliminado' }));
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
    <SubHeader title="Usuarios" ruta="/" />
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

export default Users