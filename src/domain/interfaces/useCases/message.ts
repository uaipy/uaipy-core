export interface CreateMessage {
  execute(message: CreateMessageInput): Promise<CreateMessageOutput>;
}

export interface CreateMessageInput { 
  deviceIntegrationCode: string;
  data: any;
  localReadingDate: Date;
}

export interface CreateMessageOutput {
  id: number;
  data: any;
  localReadingDate: Date;
}

