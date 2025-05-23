export class BadRequestError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'BadRequestError';
    this.errorDetails = details;
  }
}