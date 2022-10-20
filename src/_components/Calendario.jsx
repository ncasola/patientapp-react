import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { useGetAllAppointmentsQuery } from "../_store/appointment.slice";
import moment from "moment";
import { useState, useEffect, useCallback, useMemo } from "react";

const Calendario = ({ handleSelectDate, editDate }) => {
  const localizer = momentLocalizer(moment);
  const { data } = useGetAllAppointmentsQuery();
  const [events, setEvents] = useState([]);

    const handleSelectSlot = useCallback(
      ({ start, end }) => {
        setEvents((prev) => prev.filter((e) => e.title !== "Nueva Cita"));
        setEvents((prev) => [...prev, { start, end, title: "Nueva Cita", bagroundColor: 'red' }]);
        handleSelectDate({ start, end });
      },
      [setEvents, handleSelectDate]
    )
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: editDate?.dateAppointmentStart || new Date(),
        scrollToTime: new Date(),
      }),
      [editDate]
    )
  useEffect(() => {
    if (data) {
      const eventsList = data.map((appointment) => {
        return {
          title: `Cita nº ${appointment.id} - ${appointment.status} - Paciente nº ${appointment.patient.id}-${appointment.patient.name}`,
          start: new Date(appointment.dateAppointmentStart),
          end: new Date(appointment.dateAppointmentEnd),
          allDay: false,
          bagroundColor: 'green',
        };
      });
      setEvents(eventsList);
    }
  }, [data]);

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.AGENDA}
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        eventPropGetter={(event) => {
          const backgroundColor = event.backgroundColor;
          return { style: { "background-color:":  backgroundColor } }
        }}
      />
    </>
  );
};

export default Calendario;
