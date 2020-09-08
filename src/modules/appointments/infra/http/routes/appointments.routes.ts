import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticacte';
import AppointmentsControllers from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsControllers();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsControllers.create);
appointmentsRouter.post('/me', providerAppointmentsController.index);

export default appointmentsRouter;