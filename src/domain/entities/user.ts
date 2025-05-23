
import { generateUuid } from 'src/domain/utils';
import { NoDataFoundError } from './errors';

export type CreateUserInput = {
  name: string;
  password: string;
  email: string;
  details: string;
}


export default class User {
  private name: string;
  private email: string;
  private password: string;
  private details: string;
  private uuid: string;
  private createdAt: Date;
  private updatedAt: Date;
  private active: boolean;
  private deletedAt?: Date;
  private id?: number;

  constructor(
    name: string,
    email: string,
    password: string,
    details: string,
    uuid: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    deletedAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.details = details;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.active = active;
  }

  static create = (
    name: string,
    email: string,
    password: string,
    details: string,
    active: boolean
  ): User => {
    return new User(
      name,
      email,
      password,
      details,
      generateUuid(),
      new Date(),
      new Date(),
      active,
      undefined,
      undefined
    );
  };

  public getId(): number {
    if (!this.id) throw new NoDataFoundError(
      'USER-NOT-FOUND-003: the specified user ID provided was not found'
    );
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getDetails(): string {
    return this.details;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }

  public isActive(): boolean {
    return this.active;
  }
}
