import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
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

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
