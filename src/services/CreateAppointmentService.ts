import Appointment from './../models/Appointment';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const formatDate = startOfHour(date);

        const findDateAppointment = await appointmentsRepository.findByDate(formatDate);

        if (findDateAppointment)
            throw Error('This date/time is already scheduled');

        const appointment = appointmentsRepository.create({ 
            provider, 
            date: formatDate 
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;