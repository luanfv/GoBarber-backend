import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticacte';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const appointmentsRepository = new AppointmentsRepository();
    
    const parseDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
    const appointment = await createAppointmentService.execute({ 
        date: parseDate, 
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;