import User from "../../model/user";

export interface CreateUser {
  execute(params: CreateUserInput): Promise<CreateUserOutput>;
}

export interface CheckUserExistence {
  checkByEmail(email: string): Promise<User>;
  checkByUuid(uuid: string): Promise<User>;
}

export type CreateUserInput = {
  name: string;
  password: string;
  email: string;
  details: string;
};

export type CreateUserOutput = {
  success: boolean;
  message: string;
};
