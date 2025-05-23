import { ListAllUserController } from 'src/application/controllers/http';
import {
  makeListAllUsersUseCase,
} from 'src/main/factories/domain/use-cases/user/list-all';

export const makeListAllUserController = (): ListAllUserController => {
  return new ListAllUserController(
    makeListAllUsersUseCase(),
  );
};