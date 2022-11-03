import React from 'react'
import Select from 'react-select';
import { useGetAllPatientsQuery } from "_store/patient.api";

const SelectPatients = ({handleChange, value}) => {
  const { data } = useGetAllPatientsQuery();
  const defaultOption = data?.find((patient) => patient.id === value);
  const returnValue = (option) => {
    handleChange(option.id);
};
  return (
   <>
    <Select
        options={data}
        getOptionLabel={(option) => option.name + ' ' + option.lastname}
        getOptionValue={(option) => option.id}
        placeholder="Buscar paciente"
        isSearchable
        value={defaultOption}
        onChange={(option) => returnValue(option)}
        />
   </>
  )
}

export default SelectPatients