export class UnauthorizedError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'UnauthorizedError';
    this.errorDetails = details;
  }
}