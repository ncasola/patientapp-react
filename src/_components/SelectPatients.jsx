import React from 'react'
import { useGetAllPatientsQuery } from "_store/patient.api";

const SelectPatients = () => {
    const { data } = useGetAllPatientsQuery();
  return (
   <>
    {data && (
        data.map((patient) => (
            <option value={patient.id}>{patient.name} {patient.lastname}</option>
        ))
    )}
   </>
  )
}

export default SelectPatients