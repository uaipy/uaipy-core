import User from "../domain/model/user";
import CreateUser, {
  CreateUserInput,
  CreateUserOutput,
} from "../domain/interfaces/useCases/user";
import { UserDataSource } from "../data/interfaces/dataSources/userDataSource";
import Email from "../domain/model/email";
import Password from "../domain/model/password";

export default class CreateUserUseCase implements CreateUser {
  constructor(private readonly repository: UserDataSource) {}
  async execute(params: CreateUserInput): Promise<CreateUserOutput> {
    this.checkEmail(params.email);
    this.checkPassword(params.password);
    params.password = await Password.encryptPassword(params.password);
    const createdUser = await this.createUser(params);
    console.log(createdUser);
    return {
      success: true,
      message: "user created successfully",
    };
  }

  private checkEmail(email: string) {
    const isEmailValid = Email.validate(email);
    if (!isEmailValid) {
      throw new Error("invalid email");
    }
  }

  private checkPassword(password: string) {
    const isPasswordValid = Password.verifyPassword(password);
    if (!isPasswordValid) {
      throw new Error("invalid password");
    }
  }

  
  private async createUser(params: CreateUserInput): Promise<User> {
    const user = User.create(
      params.name,
      params.email,
      params.password,
      params.details,
      false
    );
    return this.repository.create(user);
  }
}
