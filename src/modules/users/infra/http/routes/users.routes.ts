import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticacte from '../middlewares/ensureAuthenticacte';

import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticacte, upload.single('avatar'), async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
});

export default usersRouter;