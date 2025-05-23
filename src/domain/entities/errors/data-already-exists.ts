export class DataAlreadyExistsError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'DataAlreadyExistsError';
    this.errorDetails = details;
  }
}