/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validator, Required, RequiredString, RequiredArray, RequiredEmail, RequiredNumber, RequiredBoolean } from './';

export type RequiredPropsType = Array<{ field: string; type: 'string' | 'number' | 'email' | 'array' | 'object' | 'boolean' }>;

export class ValidationBuilder {
  private constructor(private readonly value: any, private readonly fieldName?: string, private readonly validators: Validator[] = []) {}

  static of({ value, fieldName }: { value: any; fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(): ValidationBuilder {
    if (Array.isArray(this.value)) {
      this.validators.push(new RequiredArray(this.value, this.fieldName));
    } else if (typeof this.value === 'number') {
      this.validators.push(new RequiredNumber(this.value, this.fieldName));
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName));
    } else {
      this.validators.push(new Required(this.value, this.fieldName));
    }
    return this;
  }

  email(): ValidationBuilder {
    this.validators.push(new RequiredEmail(this.value, this.fieldName));
    return this;
  }

  requiredProps({ validate }: { validate: RequiredPropsType }): ValidationBuilder {
    // para value como lista de objetos [{}]
    if (Array.isArray(this.value)) {
      this.value.forEach((value) => {
        validate.forEach(({ field, type }) => {
          if (type === 'number') {
            this.validators.push(new RequiredNumber(value[field], `${this.fieldName}.${field}`));
          } else if (type === 'email') {
            this.validators.push(new RequiredEmail(value[field], `${this.fieldName}.${field}`));
          } else if (type === 'array') {
            this.validators.push(new RequiredArray(value[field], `${this.fieldName}.${field}`));
          } else if (type === 'string') {
            this.validators.push(new RequiredString(value[field], `${this.fieldName}.${field}`));
          } else if (type === 'boolean') {
            this.validators.push(new RequiredBoolean(value[field], `${this.fieldName}.${field}`));
          } else {
            this.validators.push(new Required(value[field], `${this.fieldName}.${field}`));
          }
        });
      });
      return this;
    }

    // para valeu como objeto {}
    validate.forEach(({ field, type }) => {
      if (type === 'number') {
        this.validators.push(new RequiredNumber(this.value[field], `${this.fieldName}.${field}`));
      } else if (type === 'email') {
        this.validators.push(new RequiredEmail(this.value[field], `${this.fieldName}.${field}`));
      } else if (type === 'array') {
        this.validators.push(new RequiredArray(this.value[field], `${this.fieldName}.${field}`));
      } else if (type === 'string') {
        this.validators.push(new RequiredString(this.value[field], `${this.fieldName}.${field}`));
      } else if (type === 'boolean') {
        this.validators.push(new RequiredBoolean(this.value[field], `${this.fieldName}.${field}`));
      } else {
        this.validators.push(new Required(this.value[field], `${this.fieldName}.${field}`));
      }
    });

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}