import Device from "../../../domain/model/device";

export interface DeviceDataSource {
  create(contact: Device): Promise<Device>;
  getAll(): Promise<Device[]>;
  getByUuid(uuid: string): Promise<Device> 
  getByIntegrationCode(integrationCode: string): Promise<Device> 
}
