import Appointment from './../models/Appointment';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {
    name: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;
    
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ name, date }: Request): Appointment {
        const formatDate = startOfHour(date);

        const findDateAppointment = this.appointmentsRepository.findByDate(formatDate);

        if (findDateAppointment)
            throw Error('This date/time is already scheduled');

        const appointment = this.appointmentsRepository.create({ 
            name, 
            date: formatDate 
        });

        return appointment;
    }
}

export default CreateAppointmentService;