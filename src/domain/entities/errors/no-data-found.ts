export class NoDataFoundError extends Error {
  public errorDetails?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'NoDataFoundError';
    this.errorDetails = details;
  }
}