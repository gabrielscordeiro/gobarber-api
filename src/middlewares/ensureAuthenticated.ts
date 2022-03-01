import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT Token is missing!');
  }
  // se não for usar uma variável da desestruturação é só deixar ela em branco. Só colocar a vírgula, e a vírgula já indica que a primeira posição eu não quero, só a segunda
  const [, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig.jwt;

    const decoded = verify(token, secret);

    // ao usar o AS está forçando a usar o tipo de uma variável
    const { sub } = decoded as TokenPayload;

    // foi criado uma pasta @types onde é adicionado uma nova tipagem ao Express. Nele foi definido uma interface pra User
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
