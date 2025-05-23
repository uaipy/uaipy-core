import { Context } from 'aws-lambda';
import { badRequest, Response, serverError } from 'src/application/helpers';
import { ValidationComposite, Validator } from 'src/application/validation';

export abstract class Controller {
    abstract perform(
        httpRequest: unknown,
        context: Context
    ): Promise<Response >

    buildValidators(httpRequest: unknown): Validator[] {
      return [];
    }

    async handle(httpRequest: unknown, context: Context): Promise<Response> {
      const error = this.validate(httpRequest);
      if (error !== undefined) return badRequest(error);
      try {
        return await this.perform(httpRequest, context);
      } catch (error) {
        return serverError(error);
      }
    }

    private validate(httpRequest: any): Error | undefined {
      const validators = this.buildValidators(httpRequest);
      return new ValidationComposite(validators).validate();
    }
        
}
