import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticacte from '../middlewares/ensureAuthenticacte';

import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticacte);

profileRouter.get('/', profileController.show);
profileRouter.put(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        }
    }),
    profileController.update
);

export default profileRouter;