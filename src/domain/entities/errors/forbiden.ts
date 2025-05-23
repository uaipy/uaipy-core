export class ForbiddenError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ForbiddenError';
    this.errorDetails = details;
  }
}