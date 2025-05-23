import { CreateUserUseCase, setupCreateUserUseCase } from 'src/domain/use-cases/user';
import {  makeUserRepository } from 'src/main/factories/infrastructure/repository/psql';

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  return setupCreateUserUseCase(makeUserRepository());
};