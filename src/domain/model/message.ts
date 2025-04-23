import ErrorCode from "../../utils/errors/error";

export default class Message {
  private deviceId: number;
  private data: any;
  private localReadingDate: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private active: boolean;
  private deletedAt?: Date;
  private id?: number;

  constructor(
    deviceId: number,
    data: any,
    localReadingDate: Date,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    deletedAt?: Date,
    id?: number
  ) {
    this.deviceId = deviceId;
    this.data = data;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
    this.localReadingDate = localReadingDate;
    this.deletedAt = deletedAt;
    this.id = id;
  }

  static create = (
    deviceId: number,
    data: any,
    localReadingDate: Date,
    active: boolean
  ): Message => {
    return new Message(
      deviceId,
      data,
      localReadingDate,
      new Date(),
      new Date(),
      active,
      undefined,
      undefined
    );
  };

  public getId(): number {
    if (!this.id) throw ErrorCode.MESSAGE_NOT_FOUND_BY_ID;
    return this.id;
  }

  public getDeviceId(): number {
    return this.deviceId;
  }

  public getData(): any {
    return this.data;
  }

  public getLocalReadingDate(): Date {
    return this.localReadingDate;
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