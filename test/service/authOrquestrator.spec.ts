import { mock, MockProxy } from 'jest-mock-extended';
import AuthenticateOrquestratorUseCase  from '../../src/service/authenticateOrquestrator';
import { CheckUserExistence } from '../../src/domain/interfaces/useCases/user';
import { CheckOrquestratorExistence } from '../../src/domain/interfaces/useCases';
import User from '../../src/domain/model/user';
import Orquestrator from '../../src/domain/model/orquestrator';
import { UserBuilder, OrquestratorBuilder } from '../builders';
import Token from '../../src/domain/model/token';
import { mockEnvironment } from '../mocks/environment';

jest.mock('../../src/utils/environment.ts', () => ({
  getValues: () => mockEnvironment
}));

describe('AuthenticateOrquestratorUseCase', () => {
  let sut: AuthenticateOrquestratorUseCase;
  let userValidationService: MockProxy<CheckUserExistence>;
  let orquestratorValidationService: MockProxy<CheckOrquestratorExistence>;
  let user: User;
  let orquestrator: Orquestrator;
  let params: { userUuid: string; orquestratorUuid: string };

  beforeEach(() => {
    user = new UserBuilder("any-email", true)
      .withId(1)
      .build();
    
    orquestrator = new OrquestratorBuilder(user.getId(), true)
      .build();
    
    // Configuramos os parâmetros
    params = { 
      userUuid: user.getUuid(), 
      orquestratorUuid: orquestrator.getUuid() 
    };

    userValidationService = mock();
    orquestratorValidationService = mock();

    userValidationService.checkByUuid.mockResolvedValue(user);
    orquestratorValidationService.checkByUuid.mockResolvedValue(orquestrator);

    sut = new AuthenticateOrquestratorUseCase(
      userValidationService,
      orquestratorValidationService
    );
  });

  it('deve autenticar um orquestrador com sucesso', async () => {
    const result = await sut.execute(params);

    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  it('deve chamar userValidationService com userUuid correto', async () => {
    await sut.execute(params);

    expect(userValidationService.checkByUuid).toHaveBeenCalledWith(params.userUuid);
    expect(userValidationService.checkByUuid).toHaveBeenCalledTimes(1);
  });

  it('deve chamar orquestratorValidationService com orquestratorUuid correto', async () => {
    await sut.execute(params);

    expect(orquestratorValidationService.checkByUuid).toHaveBeenCalledWith(params.orquestratorUuid);
    expect(orquestratorValidationService.checkByUuid).toHaveBeenCalledTimes(1);
  });

  it('deve gerar token com userUuid e orquestratorUuid corretos', async () => {
    const tokenSpy = jest.spyOn(Token, 'signOrquestrator');
    
    await sut.execute(params);

    expect(tokenSpy).toHaveBeenCalledWith({
      userUuid: user.getUuid(),
      orquestratorUuid: orquestrator.getUuid()
    });
  });

  it('deve lançar erro se userValidationService falhar', async () => {
    userValidationService.checkByUuid.mockRejectedValue(new Error('User not found'));

    await expect(sut.execute(params)).rejects.toThrow('User not found');
  });

  it('deve lançar erro se orquestratorValidationService falhar', async () => {
    orquestratorValidationService.checkByUuid.mockRejectedValue(new Error('Orquestrator not found'));

    await expect(sut.execute(params)).rejects.toThrow('Orquestrator not found');
  });

  it('deve verificar se o token gerado é válido', async () => {
    const result = await sut.execute(params);
    
    expect(result.token).toBeDefined();
    
    const decoded = Token.verifyOrquestrator(result.token);
    expect(decoded).toBeDefined();
    expect(decoded.userUuid).toBe(user.getUuid());
    expect(decoded.orquestratorUuid).toBe(orquestrator.getUuid());
  });
});