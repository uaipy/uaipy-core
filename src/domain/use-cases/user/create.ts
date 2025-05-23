import { UserRepository } from 'src/domain/contracts/repository/pgsql';
import User, { CreateUserInput } from 'src/domain/entities/user';
import { BadRequestError } from 'src/domain/entities/errors';
import Password from 'src/domain/entities/password';

export type CreateUserUseCase = (params: CreateUserInput) => Promise<void>;

type Setup = (userRepository: UserRepository) => CreateUserUseCase;
export const setupCreateUserUseCase: Setup =
  (userRepository) => async (params: CreateUserInput) => {
    const { name, password, email, details } = params;
    const encryptPassword = await Password.encryptPassword(password);
    const userAlreadyExists = await userRepository.getByEmail(email);
    if (userAlreadyExists) {
      throw new BadRequestError(
        'USER-ALREADY-EXISTS-001: the specified user already exists'
      );
    }
    const user = User.create(name, email, encryptPassword, details, false);
    await userRepository.create(user);
  };
