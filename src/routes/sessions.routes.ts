import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
  delete user.password;

  return response.json({ user, token });
});

export default SessionsRouter;
