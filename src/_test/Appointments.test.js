import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithProviders } from "_test/test-utils";
import Appointments from "_pages/_appointment/Appointments";
import AppointmentEdit from "_pages/_appointment/AppointmentEdit";
import AppointmentAdd from "_pages/_appointment/AppointmentAdd";
import { appointments, patients, nockBase } from "_test/data";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe("Appointments", () => {
  it("Load Calendar", async () => {
    nockBase.get("/api/appointments/all").reply(200, appointments.items);
    nockBase.get("/api/patients/all").reply(200, patients.items);
    const { container } = renderWithProviders(<Appointments />);
    console.log(container.innerHTML);
    setTimeout(() => {
      expect(container.innerHTML).toContain("Test Patient");
    }, 2000);
  });
  it("Create Appointment", async () => {
    nockBase.get("/api/patients/all").reply(200, patients.items);
    const appointment = appointments.items[0];
    const setShowModalAdd = jest.fn();
    // Load the page with the appointment to edit
    renderWithProviders(
    <AppointmentAdd
        newAppointment={appointment}
        show={true}
        setShow={setShowModalAdd}
    />);
    expect(screen.getByText(/Añadir Cita/i)).toBeInTheDocument();
    
    // Check if the form is loaded
    await waitFor(() => {
        expect(screen.getByText(/observations/i)).toBeInTheDocument();
    });

    // click on the button to add a new appointment
    userEvent.click(screen.getByRole('button', {  name: /enviar/i}));

    // Check if toast is shown
    setTimeout(() => {
      expect(screen.findByText("Cita creada correctamente")).toBeInTheDocument();
      }, 2000);
  });
  it("Edit Appointment", async () => {
    nockBase.get("/api/patients/all").reply(200, patients.items);
    nockBase.get("/api/appointments/1").reply(200, appointments.items[0]);
    const appointment = appointments.items[0];
    const setShowModalEdit = jest.fn();
    // Load the page with the appointment to edit
    renderWithProviders(
    <AppointmentEdit
        id={appointment.id}
        show={true}
        setShow={setShowModalEdit}
    />);
    expect(screen.getByText(/Editar Cita/i)).toBeInTheDocument();
    
    // Check if the form is loaded
    await waitFor(() => {
        expect(screen.getByText(/observations/i)).toBeInTheDocument();
    });

    // click on the button to add a new appointment
    userEvent.click(screen.getByRole('button', {  name: /enviar/i}));

    // Check if toast is shown
    setTimeout(() => {
      expect(screen.findByText("Cita actualizada correctamente")).toBeInTheDocument();
      }, 2000);
  });
});
