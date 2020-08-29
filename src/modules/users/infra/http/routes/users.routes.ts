import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticacte from '../middlewares/ensureAuthenticacte';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticacte, upload.single('avatar'), userAvatarController.update);

export default usersRouter;