import Orquestrator from "../domain/model/orquestrator";
import { CheckUserExistence } from "../domain/interfaces/useCases/user";
import { OrquestratorDataSource } from "../data/interfaces/dataSources/orquestratorDataSource";

import {
  CreateOrquestrator,
  CreateOrquestratorInput,
  CreateOrquestratorOutput,
} from "../domain/interfaces/useCases/orquestrator";

export default class CreateOrquestratorUseCase implements CreateOrquestrator {
  constructor(
    private readonly repository: OrquestratorDataSource,
    private readonly userValidationService: CheckUserExistence
  ) {}
  async execute(
    params: CreateOrquestratorInput
  ): Promise<CreateOrquestratorOutput> {
    const user = await this.userValidationService.checkByUuid(params.userUuid);
    console.log(user)
    const createdOrquestrator = await this.createOrquestrator(
      params,
      user.getId()
    );
    console.log(createdOrquestrator);
    return {
      success: true,
      message: "orquestrator created successfully",
    };
  }

  private async createOrquestrator(
    params: CreateOrquestratorInput,
    userId: number
  ): Promise<Orquestrator> {
    const orquestrator = Orquestrator.create(
      params.name,
      userId,
      params.description,
      false
    );
    return this.repository.create(orquestrator);
  }
}
