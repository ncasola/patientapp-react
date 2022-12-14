import nock from 'nock';
export const patients = {
    items: [
        {
            id: 1,
            name: 'Test Patient',
            lastname: 'Test Patient',
            email: '',
            phone: '123456789',
            address: 'Test Address',
            city: 'Test City',
            state: 'Test State',
            zip: '12345',
            country: 'Test Country',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    totalItems: 1,
};   

export const appointments = {
    items: [
        {
            id: 1,
            patientId: 1,
            dateAppointmentStart: new Date() + 1000,
            dateAppointmentEnd: new Date() + 1000,
            status: "Pendiente",
            observations: "Test Observations",
            createdAt: new Date(),
            updatedAt: new Date(),
            patient: {
                id: 1,
                name: 'Test Patient',
                lastname: 'Test Patient',
                email: '',
                phone: '123456789',
                address: 'Test Address',
                city: 'Test City',
                state: 'Test State',
                zip: '12345',
                country: 'Test Country',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        },
    ],
    totalItems: 1,
}; 

export const users = {
    items: [
        {
            id: 1,
            name: 'Test User',
            lastname: 'Test User',
            email: 'ncasolajimenez@gmail.com',
            roles: [
                {
                    id: 1,
                    name: 'admin'
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    totalItems: 1,
};

const url = 'http://localhost:3000';

export const nockBase = nock(url).persist().defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
});
