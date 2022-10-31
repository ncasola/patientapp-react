import React from "react";
import SubHeader from "_components/_layout/SubHeader";
import { Calendar, Views, luxonLocalizer } from "react-big-calendar";
import {
  useGetAppointmentsQuery,
} from "_store/appointment.api";
import { DateTime, Settings } from "luxon";
import { useState, useEffect, useCallback, useMemo } from "react";
import AppointmentAdd from "./AppointmentAdd";
import AppointmentEdit from "./AppointmentEdit";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { dateToSql} from "_helpers/localizeDate";
import { addToast } from '_store/toast.slice';
import { useDispatch } from "react-redux";

const Appointments = () => {
  Settings.defaultZone = "Etc/GMT";
  Settings.defaultLocale = "es-ES";
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });
  const { data, error, isLoading } = useGetAppointmentsQuery();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [idModal, setIdModal] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchPatient, setSearchPatient] = useState("");

  const buildEvents = useCallback(
    (appointments) => {
      const eventsList = appointments.map((appointment) => {
        return {
          title: `Cita nº ${appointment.id} - ${appointment.status} - Paciente nº ${appointment.patient.id}-${appointment.patient.name}`,
          start: new Date(appointment.dateAppointmentStart),
          end: new Date(appointment.dateAppointmentEnd),
          allDay: false,
          appointment: appointment,
        };
      });
      setEvents(eventsList);
    },
    [setEvents]
  );

  const handleSelectSlot = useCallback(
    (slotInfo) => { 
      const { start, end } = slotInfo;
      setStartDate(dateToSql(start));
      setEndDate(dateToSql(end));
      setShowModalAdd(true);
    },
    [setShowModalAdd, setStartDate, setEndDate]
  );

  const onSelectEvent = useCallback(
    (calEvent) => {
      const id = calEvent.appointment.id;
      setIdModal(id);
      setShowModalEdit(true);
    },
    [setShowModalEdit, setIdModal]
  );

  const searchFormPatient = () => {
    if (searchPatient !== "") {
      const filteredEvents = events.filter((event) => {
        return event.appointment.patient.name
          .toLowerCase()
          .includes(searchPatient.toLowerCase());
      });
      if(filteredEvents.length === 0){
        dispatch(addToast({title: "Fallo", message: 'No se han encontrado resultados', type: 'warning'}));
      } else {
        setEvents(filteredEvents);
      }      
    }
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );
  useEffect(() => {
    if (data) {
      buildEvents(data.items);
    }
  }, [data, buildEvents]);


  return (
    <div className="row mt-4 gy-5">
      <div className="col-12">
        <SubHeader title="Citas" ruta="/" />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <AppointmentAdd
          startDate={startDate}
          endDate={endDate}
          show={showModalAdd}
          setShow={setShowModalAdd}
        />
        <AppointmentEdit id={idModal} show={showModalEdit} setShow={setShowModalEdit} />
        <div className="form_container">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar paciente"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
            />
              <Button variant="outline-secondary" onClick={() => searchFormPatient()}>
                Buscar
              </Button>
          </InputGroup>
          {events.length > 0 && (
            <Calendar
              localizer={localizer}
              events={events}
              defaultView={Views.WORK_WEEK}
              style={{ height: 500 }}
              onSelectSlot={handleSelectSlot}
              selectable
              defaultDate={defaultDate}
              scrollToTime={scrollToTime}
              views={["work_week", "agenda", "day"]}
              onSelectEvent={onSelectEvent}
              showAllEvents
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
