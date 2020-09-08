import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsSerivce from './ListProviderAppointmentsSerivce';

let listProviderAppointmentsSerivce: ListProviderAppointmentsSerivce;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointmentsSerivce = new ListProviderAppointmentsSerivce(fakeAppointmentsRepository);
    });

    it('should be able to list the appointments on specific day', async () => {        
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });

        const appointments = await listProviderAppointmentsSerivce.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([ appointment1, appointment2 ]);
    });
});