import { ListAllUsersUseCase, setupListAllUsersUseCase } from 'src/domain/use-cases/user';
import {  makeUserRepository } from 'src/main/factories/infrastructure/repository/psql';

export const makeListAllUsersUseCase = (): ListAllUsersUseCase => {
  return setupListAllUsersUseCase(makeUserRepository());
};