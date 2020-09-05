import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticacte from '../middlewares/ensureAuthenticacte';
import uploadConfig from '@config/upload';

import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticacte);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;