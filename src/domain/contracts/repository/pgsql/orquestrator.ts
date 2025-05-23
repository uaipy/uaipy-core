import Orquestrator from 'src/domain/entities/orquestrator';

export interface OrquestratorRepository {
  create(contact: Orquestrator): Promise<Orquestrator>;
  getByUuid(uuid: string): Promise<Orquestrator>;
}