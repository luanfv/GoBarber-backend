import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsSerivce from '@modules/appointments/services/ListProviderAppointmentsSerivce';

export default class ProviderAppointmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.query;
    
        const listProviderAppointmentsSerivce = container.resolve(ListProviderAppointmentsSerivce);
        
        const appointment = await listProviderAppointmentsSerivce.execute({ 
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(appointment);
    }
}