export interface AuthenticateOrquestrator {
  execute(params: AuthenticateOrquestratorInput): Promise<AuthenticateOrquestratorOutput>;
}

export type AuthenticateOrquestratorInput = {
  userUuid: string;
  orquestratorUuid: string;
};

export type AuthenticateOrquestratorOutput = {
  success: boolean;
  token: string;
};
