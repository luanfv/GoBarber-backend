import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositores/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const formatDate = startOfHour(date);

        const findDateAppointment = await appointmentsRepository.findByDate(formatDate);

        if (findDateAppointment)
            throw new AppError('This date/time is already scheduled');

        const appointment = appointmentsRepository.create({ 
            provider_id, 
            date: formatDate 
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;