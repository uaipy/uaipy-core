import { NoDataFoundError } from './errors';

export type CreateDeviceInput = {
    orquestratorId: number;
    integrationCode: string;
    uuid: string;
    name: string;
    type: string;
  };
  
export type CreateDeviceOutput = {
    success: boolean;
    message: string;
  };

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
    if (!this.id) throw new NoDataFoundError('DEVICE-NOT-FOUND-001: the specified device ID provided was not found');
    return this.id;
  }
}

