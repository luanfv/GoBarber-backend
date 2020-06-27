import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from './../models/Appointment';

const appointmentsRouter = Router();
const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => response.json(appointments));

appointmentsRouter.post('/', (request, response) => {
    const { name, date } = request.body;
    const formatDate = startOfHour(parseISO(date));
    const isScheduledDate = appointments.find(appointment => isEqual(appointment.date, formatDate));

    if (isScheduledDate)
        return response.status(400).json({ message: 'This date/time is already scheduled' });

    const appointment = new Appointment(name, formatDate)

    appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentsRouter;