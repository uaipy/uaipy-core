export interface AuthenticateUser {
  execute(params: AuthenticateUserInput): Promise<AuthenticateUserOutput>;
}

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export type AuthenticateUserOutput = {
  success: boolean;
  token: string;
};
