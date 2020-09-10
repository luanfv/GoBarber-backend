import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository') 
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository') 
        private notificationsRepository: INotificationsRepository
    ) {}

    public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now()))
            throw new AppError("You can't create an appointment on a past date.");

        const findDateAppointment = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findDateAppointment)
            throw new AppError('This date/time is already scheduled');

        if (user_id === provider_id)
            throw new AppError("You can't create an appointment with yourself.");

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
            throw new AppError('You can only create appointments between 8am and 5pm');

        const appointment = this.appointmentsRepository.create({ 
            provider_id, 
            user_id,
            date: appointmentDate 
        });

        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormated}`,
        });

        return appointment;
    }
}

export default CreateAppointmentService;