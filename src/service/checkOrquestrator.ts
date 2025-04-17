import Orquestrator from "../domain/model/orquestrator";
import { CheckOrquestratorExistence } from "../domain/interfaces/useCases/orquestrator";
import { OrquestratorDataSource } from "../data/interfaces/dataSources/orquestratorDataSource";
import ErrorCode from "../utils/errors/error";

export default class CheckOrquestratorExistenceUseCase implements CheckOrquestratorExistence {
  constructor(private readonly repository: OrquestratorDataSource) {}

  async checkByUuid(uuid: string): Promise<Orquestrator> {
    const orquestrator = await this.repository.getByUuid(uuid);
    if (!orquestrator) {
      throw ErrorCode.ORQUESTRATOR_NOT_FOUND_BY_UUID;
    }
    return orquestrator;
  }
}
