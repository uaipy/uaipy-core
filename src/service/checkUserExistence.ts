import User from "../domain/model/user";
import { CheckUserExistence } from "../domain/interfaces/useCases/user";
import { UserDataSource } from "../data/interfaces/dataSources/userDataSource";
import ErrorCode from "../utils/errors/error";

export default class CheckUserExistenceUseCase implements CheckUserExistence {
  constructor(private readonly repository: UserDataSource) {}
  async checkByEmail(email: string): Promise<User> {
    const user = await this.repository.getByEmail(email);
    if (!user) {
      throw ErrorCode.USER_NOT_FOUND_BY_EMAIL;
    }
    return user;
  }
  async checkByUuid(uuid: string): Promise<User> {
    const user = await this.repository.getByEmail(uuid);
    if (!user) {
      throw ErrorCode.USER_NOT_FOUND_BY_UUID;
    }
    return user;
  }
}
