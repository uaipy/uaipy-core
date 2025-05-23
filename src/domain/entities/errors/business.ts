export class BusinessError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'BusinessError';
    this.errorDetails = details;
  }
}