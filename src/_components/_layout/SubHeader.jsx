import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const SubHeader = ({ruta, title}) => {
  return (
    <div className="col-12 mb-4">
        <Link to={ruta}>
    <Button
        variant="light"
        className="button-step"
    >
        Volver
    </Button>
        </Link>
    <p className="step_header d-inline-flex ms-4">{title}</p>
</div>
  )
}

export default SubHeader