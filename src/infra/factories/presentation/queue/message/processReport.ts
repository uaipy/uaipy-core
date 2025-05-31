import { ProcessReportController } from "src/presentation/queue/message";
import { makeProcessReportUseCase } from "../../../service/queue/message";
    
export const makeProcessReportController = (): ProcessReportController => {
    return new ProcessReportController(makeProcessReportUseCase());
}