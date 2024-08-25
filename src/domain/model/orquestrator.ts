import ErrorCode from "../../utils/errors/error";
import { generateUuid } from "../../utils/uuid";

export default class Orquestrator {
  private name: string;
  private userId: number;
  private description: string;
  private uuid: string;
  private createdAt: Date;
  private updatedAt: Date;
  private active: boolean;
  private deletedAt?: Date;
  private id?: number;

  constructor(
    name: string,
    userId: number,
    description: string,
    uuid: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    deletedAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.description = description;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.active = active;
  }

  static create = (
    name: string,
    userId: number,
    description: string,
    active: boolean
  ): Orquestrator => {
    return new Orquestrator(
      name,
      userId,
      description,
      generateUuid(),
      new Date(),
      new Date(),
      active,
      undefined,
      undefined
    );
  };

  public getId(): number {
    if (!this.id) throw ErrorCode.ORQUESTRATOR_NOT_FOUND_BY_UUID;
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getDescription(): string {
    return this.description;
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
