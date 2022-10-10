import React from 'react'
import { useState } from 'react';
const SubHeaderComponent = ({onFilter}) => {
    const [value, setValue] = useState('');
    const handleClear = () => {
        setValue('');
        const input = document.querySelector('#search');
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const handleChange = (e) => {
        setValue(e.target.value);
        onFilter(e);
    };
  return (
    <>
    <div class="input-group mb-3">
        <input id="search" type="text" className="form-control" placeholder="Buscar" value={value} aria-label="Buscar" onChange={handleChange} />
        <button className="btn btn-outline-secondary" type="button" onClick={handleClear} id="button-addon2">X</button>
    </div>
    </>
  )
}

export default SubHeaderComponent