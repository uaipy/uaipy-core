import Orquestrator from "src/domain/model/orquestrator";

export interface CreateOrquestrator {
  execute(params: CreateOrquestratorInput): Promise<CreateOrquestratorOutput>;
}

export type CreateOrquestratorInput = {
  userUuid: string;
  name: string;
  description: string;
};

export type CreateOrquestratorOutput = {
  success: boolean;
  message: string;
};

export interface CheckOrquestratorExistence {
  checkByUuid(uuid: string): Promise<Orquestrator>;
}