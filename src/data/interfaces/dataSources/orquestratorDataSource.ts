import Orquestrator from "../../../domain/model/orquestrator";

export interface OrquestratorDataSource {
  create(contact: Orquestrator): Promise<Orquestrator>;
  getByUuid(uuid: string): Promise<Orquestrator>;
}