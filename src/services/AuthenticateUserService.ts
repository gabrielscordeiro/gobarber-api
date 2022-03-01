import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect e-mail/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect e-mail/password combination.');
    }

    const token = sign({}, 'df54aa57139e33658e6cd915b63382d6', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
