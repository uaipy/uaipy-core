import { ValidationBuilder, Validator } from 'src/application/validation';
import { Controller } from '../controller';
import { badRequest, notFound, Response, ok } from 'src/application/helpers/http';
import { BadRequestError, NoDataFoundError, } from 'src/domain/entities/errors';
import { CreateUserUseCase } from 'src/domain/use-cases';
import { CreateUserInput } from 'src/domain/entities/user';

type HttpRequest = {
    body: CreateUserInput;
};

type Model = Error | boolean;

export class CreateUserController extends Controller  {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }
  async perform({ body}: HttpRequest): Promise<Response<Model>> {
    try {
      await this.createUserUseCase(body);
      return ok(true);
    } catch (error) {
      if (error instanceof NoDataFoundError) return notFound(error);
      if (error instanceof BadRequestError) return badRequest(error);
      throw error;
    }
  }
  buildValidators({ body }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: body.name, fieldName: 'name' }).required().build(),
      ...ValidationBuilder.of({ value: body.email, fieldName: 'email' }).required().build(),
      ...ValidationBuilder.of({ value: body.details, fieldName: 'details' }).required().build(),
      ...ValidationBuilder.of({ value: body.password, fieldName: 'password' }).required().build(),
    ];
  }
}