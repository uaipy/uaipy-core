import { UserRepository } from 'src/domain/contracts/repository/pgsql';
import User from 'src/domain/entities/user';

export type ListAllUsersUseCase = () => Promise<User[]>;

type Setup = (userRepository: UserRepository) => ListAllUsersUseCase;
export const setupListAllUsersUseCase: Setup = (userRepository) => async () => {
  const users = await userRepository.getAll();
  return users;
};
