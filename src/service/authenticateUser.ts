import {
  AuthenticateUser,
  AuthenticateUserInput,
  AuthenticateUserOutput,
} from "../domain/interfaces/useCases/userAuth";
import { CheckUserExistence } from "../domain/interfaces/useCases/user";
import Email from "../domain/model/email";
import Password from "../domain/model/password";
import ErrorCode from "../utils/errors/error";
import Token from "../domain/model/token";

export default class AuthenticateUserUseCase implements AuthenticateUser {
  constructor(private readonly userValidatinService: CheckUserExistence) {}
  async execute(params: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    this.checkEmail(params.email);
    this.checkPassword(params.password);
    const user = await this.userValidatinService.checkByEmail(params.email);
    const isPasswordValid = Password.verifyHash(
      params.password,
      user.getPassword()
    );
    if (!isPasswordValid) {
      throw ErrorCode.INVALID_PASSWORD;
    }
    const token = Token.sign({
        userUuid: user.getUuid(),
        email: user.getEmail(),
      });
    return {
      success: true,
      token,
    };
  }

  private checkEmail(email: string) {
    const isEmailValid = Email.validate(email);
    if (!isEmailValid) {
      throw ErrorCode.INVALID_EMAIL(email);
    }
  }

  private checkPassword(password: string) {
    const isPasswordValid = Password.verifyPassword(password);
    if (!isPasswordValid) {
      throw ErrorCode.INVALID_PASSWORD;
    }
  }

}
