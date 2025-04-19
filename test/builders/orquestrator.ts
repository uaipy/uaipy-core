import Orquestrator from "../../src/domain/model/orquestrator";

export class OrquestratorBuilder {
  private orquestrator: Orquestrator;

  constructor(userId: number, active: boolean) {
    this.orquestrator = Orquestrator.create(
         "any-name",
        userId,
        "any-description",
        active
    );
  }

  build(): Orquestrator {
    return this.orquestrator;
  }
}