import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@gmail.com',
        });

        expect(updateUser.name).toBe('John Trê');
        expect(updateUser.email).toBe('johntre@gmail.com');
    });

    it('should be able to update the profile from non-existing user', async () => {
        await expect(updateProfileService.execute({
            user_id: 'non-existin-user-id',
            name: 'Test',
            email: 'test@test.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Teste',
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@gmail.com',
            password: '123123',
            old_password: '123456',
        });

        expect(updateUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@gmail.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@gmail.com',
            password: '123123',
            old_password: '1472856'
        })).rejects.toBeInstanceOf(AppError);
    });
});