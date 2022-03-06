import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import User from '../models/User';

import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    // pode usar o save para também atualizar o usuário. Ao passar o User como paramêtro ele vai verificar se ele tem o ID. Se tiver ID ele faz update, caso contrário cria um novo
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
