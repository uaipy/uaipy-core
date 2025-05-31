import { PersistMessageController } from "src/presentation/queue/message";
import { makePersistMessageUseCase } from "../../../service/queue/message";

export const makePersistMessageController = (): PersistMessageController => {
    return new PersistMessageController(makePersistMessageUseCase());
}