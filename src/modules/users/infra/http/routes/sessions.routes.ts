import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SenssionsController from '../controllers/SessionsController';

const sessionsController = new SenssionsController();

const sessionsRouter = Router();

sessionsRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    sessionsController.create
);

export default sessionsRouter;