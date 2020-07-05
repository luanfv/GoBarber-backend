import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from './../models/User';
import { sign } from 'jsonwebtoken';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserSerivce {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if (!user)
            throw Error('Incorrect email/password combination.')

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
            throw Error('Incorrect email/password combination.');

        const token = sign(
            {}, 
            'f2f450166b22e22301e908424c859963', 
            {
                subject: user.id,
                expiresIn: '1d',
            }
        );

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserSerivce;