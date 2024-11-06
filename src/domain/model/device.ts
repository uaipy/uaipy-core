import ErrorCode from "../../utils/errors/error";

export default class Device {
  private orquestrationId: number;
  private integrationCode: string;
  private uuid: string;
  private name: string;
  private type: string;
  private createdAt: Date;
  private updatedAt: Date;
  private active: boolean;
  private deletedAt?: Date;
  private id?: number;

  constructor(
    orquestrationId: number,
    integrationCode: string,
    uuid: string,
    name: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    deletedAt?: Date,
    id?: number
  ) {
    this.orquestrationId = orquestrationId;
    this.integrationCode = integrationCode;
    this.uuid = uuid;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
    this.deletedAt = deletedAt;
    this.id = id;
  }

  getOrquestrationId(): number {
    return this.orquestrationId;
  }

  getIntegrationCode(): string {
    return this.integrationCode;
  }

  getUuid(): string {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  isActive(): boolean {
    return this.active;
  }

  getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }

  getId(): number {
    if (!this.id) throw ErrorCode.DEVICE_NOT_FOUND_BY_ID;
    return this.id;
  }
}