import React from "react";
import { Calendar, Views, luxonLocalizer  } from "react-big-calendar";
import { useGetAllAppointmentsQuery } from "../_store/appointment.api";
import { DateTime, Settings } from 'luxon'
import { useState, useEffect, useCallback, useMemo } from "react";

const Calendario = ({ handleSelectDate }) => {
  Settings.defaultZone = 'Etc/GMT';
  Settings.defaultLocale = 'es-ES';
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })
  const { data } = useGetAllAppointmentsQuery();
  const [events, setEvents] = useState([]);
    const handleSelectSlot = useCallback(
      (slotInfo) => {
        if (slotInfo.slots && slotInfo.slots.length <= 1) {
          return false;
        }
        const { start, end } = slotInfo;
        setEvents((prev) => prev.filter((e) => e.title !== "Nueva Cita"));
        setEvents((prev) => [...prev, { start, end, title: "Nueva Cita", bagroundColor: 'red' }]);
        handleSelectDate({ start, end });
      },
      [setEvents, handleSelectDate]
    )
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: new Date(),
        scrollToTime: new Date(),
      }),
      []
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
        defaultView={Views.WORK_WEEK}
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        eventPropGetter={(event) => {
          const backgroundColor = event.backgroundColor;
          return { style: { backgroundColor:  backgroundColor } }
        }}
        views={['work_week', 'agenda', 'month']}
      />
    </>
  );
};

export default Calendario;
