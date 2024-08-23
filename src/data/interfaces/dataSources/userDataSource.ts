import User from "../../../domain/model/user";

export interface UserDataSource {
  create(contact: User): Promise<User>;
  getAll(): Promise<User[]>;
  getByUuid(uuid: string): Promise<User> 
  getByEmail(uuid: string): Promise<User> 
}
