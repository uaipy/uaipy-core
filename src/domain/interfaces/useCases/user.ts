export default interface CreateUser {
  execute(params: CreateUserInput): Promise<CreateUserOutput>;
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
