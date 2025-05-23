export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const globalRequired = 'GLOBAL.ERRORS.REQUIRED_FIELD';
    const message = !fieldName ? `${globalRequired}.ANY` : `${globalRequired}.${fieldName.toUpperCase()}`;
    super(message);
    this.name = 'RequiredFieldError';
  }
}
  
export class RequiredEmailError extends Error {
  constructor() {
    super('GLOBAL.ERRORS.INVALID_FIELD.EMAIL');
    this.name = 'RequiredEmailError';
  }
}