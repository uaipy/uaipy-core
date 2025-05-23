import { ValidationBuilder, Validator } from 'src/application/validation';
import { Controller } from '../controller';
import { badRequest, notFound, Response, ok } from 'src/application/helpers/http';
import { BadRequestError, NoDataFoundError, } from 'src/domain/entities/errors';
import { ListAllUsersUseCase } from 'src/domain/use-cases';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import Token, { UserTokenPayload } from 'src/domain/entities/token';

type Model = Error | boolean;

type HttpRequest = {
    headers: APIGatewayProxyEventV2['headers'];
}

export class ListAllUserController extends Controller  {
  constructor(private readonly listAllUsersUseCase: ListAllUsersUseCase) {
    super();
  }
  async perform({headers }: HttpRequest): Promise<Response<Model>> {
    try {
      this.privateRequest(headers.Authorization || '');
      await this.listAllUsersUseCase();
      return ok(true);
    } catch (error) {
      if (error instanceof NoDataFoundError) return notFound(error);
      if (error instanceof BadRequestError) return badRequest(error);
      throw error;
    }
  }

  private privateRequest(authToken: string): UserTokenPayload {
    const token = Token.verifyUser(authToken);
    return token;
  }

  buildValidators({ headers }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: headers.Authorization, fieldName: 'Authorization' }).required().build(),
    ];
  }
}