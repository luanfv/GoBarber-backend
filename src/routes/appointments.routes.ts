import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => response.json(appointmentsRepository.getAppointments()));

appointmentsRouter.post('/', (request, response) => {
    const { name, date } = request.body;
    const formatDate = startOfHour(parseISO(date));
    const findDateAppointment = appointmentsRepository.findByDate(formatDate);

    if (findDateAppointment)
        return response.status(400).json({ message: 'This date/time is already scheduled' });

    const appointment = appointmentsRepository.create({ 
        name, 
        date: formatDate 
    });

    return response.json(appointment);
});

export default appointmentsRouter;