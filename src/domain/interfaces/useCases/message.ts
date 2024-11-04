export interface CreateMessageUseCase {
  execute(message: CreateMessageInput): Promise<CreateMessageOutput>;
}

export interface CreateMessageInput {
  deviceId: number;
  data: any;
  messageReadDate: Date;
}

export interface CreateMessageOutput {
  id: number;
  deviceId: number;
  data: any;
  messageReadDate: Date;
}

