import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getAllRows } from 'testing-library-table-queries'
import { renderWithProviders } from '_test/test-utils'
import { Home } from '_pages/home/Home'
import { patients, appointments, nockBase } from '_test/data'

describe('Home', () => {
    it('Load Patients and Appointments', async () => {
        nockBase.get('/api/patients').query(true).reply(200, patients);
        nockBase.get('/api/appointments').query(true).reply(200, appointments);

        renderWithProviders(<Home />);
        await waitFor(() => {
            const tablePatients = screen.getByTestId('pacientes');
            const tableAppointments = screen.getByTestId('citas');
            expect(getAllRows(tablePatients).length).toBe(1);
            expect(getAllRows(tableAppointments).length).toBe(1);
        });
    });
});