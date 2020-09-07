import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
            @inject('appointmentsRepository') 
            private appointmentsRepository: IAppointmentsRepository
        ) {}

    public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
        const formatDate = startOfHour(date);

        const findDateAppointment = await this.appointmentsRepository.findByDate(formatDate);

        if (findDateAppointment)
            throw new AppError('This date/time is already scheduled');

        const appointment = this.appointmentsRepository.create({ 
            provider_id, 
            user_id,
            date: formatDate 
        });

        return appointment;
    }
}

export default CreateAppointmentService;