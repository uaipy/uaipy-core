import Device from 'src/domain/entities/device';

export interface DeviceRepository {
  create(contact: Device): Promise<Device>;
  getAll(): Promise<Device[]>;
  getByUuid(uuid: string): Promise<Device> 
  getByIntegrationCode(integrationCode: string): Promise<Device> 
}
