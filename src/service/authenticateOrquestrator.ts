import {
  AuthenticateOrquestrator,
  AuthenticateOrquestratorInput,
  AuthenticateOrquestratorOutput,
  CheckOrquestratorExistence,
} from "../domain/interfaces/useCases"; 
import { CheckUserExistence } from "../domain/interfaces/useCases/user";
import Token from "../domain/model/token";

export default class AuthenticateOrquestratorUseCase implements AuthenticateOrquestrator {
  constructor(
    private readonly userValidationService: CheckUserExistence,
    private readonly orquestratorValidationService: CheckOrquestratorExistence
  ) {}
  async execute(params: AuthenticateOrquestratorInput): Promise<AuthenticateOrquestratorOutput> {
    const user = await this.userValidationService.checkByUuid(params.userUuid);
    const orquestrator = await this.orquestratorValidationService.checkByUuid(params.orquestratorUuid);
    const token = Token.signOrquestrator({
        userUuid: user.getUuid(),
        orquestratorUuid: orquestrator.getUuid(),
      });
    

    return {
      success: true,
      token,
    };
  }
}
