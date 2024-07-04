import User from "../../../domain/model/user";

export interface UserDataSource {
  create(contact: User): Promise<User>;
  getAll(): Promise<User[]>;
}
