import Device from "../../model/device";

export interface CreateDevice {
  execute(params: CreateDeviceInput): Promise<CreateDeviceOutput>;
}

export interface CheckDeviceExistence {
  checkByIntegrationCode(integrationCode: string): Promise<Device>;
}

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
