import Orquestrator from "../../model/orquestrator";

export interface CreateOrquestrator {
  execute(params: CreateOrquestratorInput): Promise<CreateOrquestratorOutput>;
}

export interface CheckOrquestratorExistence {
  checkByUuid(uuid: string): Promise<Orquestrator>;
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