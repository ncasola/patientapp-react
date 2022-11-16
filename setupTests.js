import '@testing-library/jest-dom';
import { patientApi } from "_store/patient.api";
import { appointmentApi } from "_store/appointment.api";
import { authApi } from "_store/auth.api";
import { userApi } from "_store/user.api";
import { store } from '_store'
import nock from 'nock';

beforeEach(() => {
    jest.useFakeTimers();
});


afterEach(() => {
    nock.cleanAll();
    // This is the solution to clear RTK Query cache after each test
    store.dispatch(patientApi.util.resetApiState());
    store.dispatch(appointmentApi.util.resetApiState());
    store.dispatch(authApi.util.resetApiState());
    store.dispatch(userApi.util.resetApiState());

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});