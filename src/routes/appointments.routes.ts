import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => response.json(appointmentsRepository.getAppointments()));

appointmentsRouter.post('/', (request, response) => {
    try {
        const { name, date } = request.body;
        const parseDate = parseISO(date);
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
        const appointment = createAppointmentService.execute({ date: parseDate, name: name });

        return response.json(appointment);
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;