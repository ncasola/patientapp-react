import React from "react";
import SubHeader from "_components/_layout/SubHeader";
import { Calendar, Views, luxonLocalizer } from "react-big-calendar";
import { useGetAllAppointmentsQuery } from "_store/appointment.api";
import { DateTime, Settings } from "luxon";
import { useState, useEffect, useCallback, useMemo } from "react";
import AppointmentAdd from "./AppointmentAdd";
import AppointmentEdit from "./AppointmentEdit";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { dateToSql } from "_helpers/localizeDate";
import { addToast } from "_store/toast.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import spanishMessages from "_helpers/spanishCalendar";
import SelectPatients from "_components/SelectPatients";

const Appointments = () => {
  Settings.defaultZone = "Etc/GMT";
  Settings.defaultLocale = "es-ES";
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });
  const { data, error, isLoading } = useGetAllAppointmentsQuery();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [idModal, setIdModal] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchPatient, setSearchPatient] = useState({});

  const buildEvents = useCallback(
    (appointments) => {
      const eventsList = appointments.map((appointment) => {
        return {
          title: `Cita nº ${appointment.id} - ${appointment.status} - ${appointment.patient.name} ${appointment.patient.lastname}`,
          start: new Date(appointment.dateAppointmentStart),
          end: new Date(appointment.dateAppointmentEnd),
          allDay: false,
          appointment: appointment,
        };
      });
      eventsList.push({
        title: "Cita nº 1 - Pendiente - Paciente 1",
        start: new Date("2000-09-01T10:00:00"),
        end: new Date("2000-09-01T11:00:00"),
        allDay: false,
        appointment: {
          patient: {
            id: "00000"
          },
        }
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

  const searchFormPatient = (e) => {
    e.preventDefault();
    const filteredEvents = events.filter((event) => {
      return event.appointment.patient.id === searchPatient;
    });
    if (filteredEvents.length > 0) {
      setEvents(filteredEvents);
    } else {
      dispatch(
        addToast({
          message: "No hay citas para este paciente",
          type: "warning",
          title: "Atención",
        })
      );
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
      buildEvents(data);
    }
  }, [data, buildEvents]);

  return (
    <Container className="mt-4">
        <SubHeader title="Citas" ruta="/" />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {showModalAdd && <AppointmentAdd
          newAppointment={{
            dateAppointmentStart: startDate,
            dateAppointmentEnd: endDate,
          }}
          show={showModalAdd}
          setShow={setShowModalAdd}
        />
        }
        {showModalEdit && <AppointmentEdit
          id={idModal}
          show={showModalEdit}
          setShow={setShowModalEdit}
        />
        }
        <Container className="custom_container">
        <Row className="g-3 mb-4">
        <Col sm>
              <Form onSubmit={searchFormPatient}>
                <Row className="g-3">
                  <Form.Group as={Col}>
                    <SelectPatients handleChange={setSearchPatient} />
                  </Form.Group>
                  <Form.Group as={Col}>
                  <ButtonGroup>
                    <Button variant="primary" type="submit">
                      <FontAwesomeIcon icon="search" /> Buscar
                    </Button>
                    <Button variant="warning" onClick={() => buildEvents(data)}>
                      <FontAwesomeIcon icon="undo" /> Limpiar
                    </Button>
                    </ButtonGroup>
                  </Form.Group>
                </Row>
              </Form>
              </Col>
          </Row>
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
              messages={spanishMessages}
            />
          )}
        </Container>
    </Container>
  );
};

export default Appointments;
