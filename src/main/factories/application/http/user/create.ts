import { CreateUserController } from 'src/application/controllers/http';
import {
  makeCreateUserUseCase,
} from 'src/main/factories/domain/use-cases/user/create';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(
    makeCreateUserUseCase(),
  );
};