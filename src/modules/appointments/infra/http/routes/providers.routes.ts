import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticacte';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const appointmentsControllers = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', appointmentsControllers.index);

export default providersRouter;