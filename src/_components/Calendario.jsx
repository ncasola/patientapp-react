import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useGetAllAppointmentsQuery } from '../_store/appointment.slice'
import moment from 'moment'
import { useState, useEffect } from 'react';

const Calendario = () => {
    const localizer = momentLocalizer(moment)
    const { data } = useGetAllAppointmentsQuery();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        if (data) {
            const eventsList = data.map((appointment) => {
                return {
                    title: appointment.patient.name,
                    start: moment(appointment.date).toDate(),
                    end: moment(appointment.date).toDate()
                }
            });
            setEvents(eventsList);
        }
    }, [data])
  return (
    <>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </>
  )
}

export default Calendario