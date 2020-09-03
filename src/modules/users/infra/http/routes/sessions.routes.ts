import { Router } from 'express';

import SenssionsController from '../controllers/SessionsController';

const sessionsController = new SenssionsController();

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;