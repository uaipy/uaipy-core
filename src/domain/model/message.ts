import ErrorCode from "../../utils/errors/error";

export type MessageInputType = {
  data: {
    deviceId: number;
    messages: MessageType[];
  }[]
}

type MessageType = {
  temperature: number;
  humidity: number;
  localReadingDate: Date;
  rain: number;
}
export default class Message {
  private orquestratorId: number;
  private data: MessageInputType;
  private createdAt: Date;
  private updatedAt: Date;
  private active: boolean;
  private deletedAt?: Date;
  private id?: number;

  constructor(orquestratorId: number, data: MessageInputType, createdAt: Date, updatedAt: Date, active: boolean, deletedAt?: Date, id?: number) {
    this.orquestratorId = orquestratorId;
    this.data = data;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
    this.deletedAt = deletedAt;
    this.id = id;
  }

  static create(orquestratorId: number, data: MessageInputType, createdAt: Date, updatedAt: Date, active: boolean, deletedAt?: Date, id?: number): Message {
    return new Message(orquestratorId, data, createdAt, updatedAt, active, deletedAt, id);
  }

  public getId(): number {
    if (!this.id) throw ErrorCode.MESSAGE_NOT_FOUND_BY_ID;
    return this.id;
  }

  public getOrquestratorId(): number {
    return this.orquestratorId;
  }

  public getData(): MessageInputType {
    return this.data;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}

  

