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


export interface GetMessage {
  execute(message: GetMessageInput): Promise<GetMessageOutput[]>;
}

export interface GetMessageInput { 
  deviceIntegrationCode: string;
}

export interface GetMessageOutput {
  id: number;
  data: any;
  localReadingDate: Date;
}

