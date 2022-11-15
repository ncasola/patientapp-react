import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithProviders } from "_test/test-utils";
import Patients from "_pages/_patients/Patients";
import PatientEdit from "_pages/_patients/PatientEdit";
import PatientAdd from "_pages/_patients/PatientAdd";
import Patient from "_pages/_patients/Patient";
import { patients, nockBase, appointments } from "_test/data";
import Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe("Patients", () => {
  it("Load DataTable", async () => {
    nockBase.get("/api/patients").query(true).reply(200, patients);

    const { container } = renderWithProviders(<Patients />);

    await waitFor(() => {
      expect(container.querySelector('div[id="row-1"]')).not.toBeNull();
    });
  });
  it("Delete Patient", async () => {
    nockBase.get("/api/patients").query(true).reply(200, patients);
    nockBase.delete("/api/patients/1").reply(200, {});

    const { container } = renderWithProviders(<Patients />);

    await waitFor(() => {
      const deleteButton = container.querySelector('button[id="delete-1"]');
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(container.querySelector('div[id="row-1"]')).toBeNull();
    });
  });
  it("Edit Patient", async () => {
    nockBase.get("/api/patients/1").reply(200, patients.items[0]);
    nockBase.put("/api/patients/1").reply(200, {});

    // Load the page with the patient to edit
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' })
    const { container } = renderWithProviders(<PatientEdit />);

    // Check if the form is loaded
    await waitFor(() => {
        expect(container.querySelector('input[name="name"]')).not.toBeNull();
    });

    // Change the 
    userEvent.type(screen.getByRole('textbox', { name: /nombre/i }), 'Test Patient 2');

    // Save the form
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Check if toast is shown
    await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });
  });
  it("View Patient", async () => {
    nockBase.get("/api/patients/1").reply(200, patients.items[0]);
    nockBase.get("/api/appointments/1").reply(200, appointments.items[0]);
    nockBase.get("/api/appointments/all/1").reply(200, appointments.items);
    // Load the page with the patient to edit
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' })
    const { container } = renderWithProviders(<Patient />);

    await waitFor(() => {
        // Check if the patient name is shown
        expect(screen.getAllByText(/Test Patient/i)[0]).toBeInTheDocument();
    });
  });
  it("Create Patient", async () => {
    nockBase.post("/api/patients").reply(200, {});

    // Load the page with the patient to edit
    const { container } = renderWithProviders(<PatientAdd />);

    // Check if the form is loaded
    await waitFor(() => {
        expect(container.querySelector('input[name="name"]')).not.toBeNull();
    });

    // Change the 
    userEvent.type(screen.getByRole('textbox', { name: /nombre/i }), 'Test Patient 2');

    // Save the form
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Check if toast is shown
    await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });
  });
});
