import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticacte';
import AppointmentsControllers from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsControllers();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsControllers.create);

export default appointmentsRouter;