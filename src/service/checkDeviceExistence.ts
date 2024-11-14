import Device from "../domain/model/device";
import { CheckDeviceExistence } from "../domain/interfaces/useCases/device";
import { DeviceDataSource } from "../data/interfaces/dataSources/deviceDataSource";
import ErrorCode from "../utils/errors/error";

export default class CheckDeviceExistenceUseCase implements CheckDeviceExistence {
  constructor(private readonly repository: DeviceDataSource) {}
  async checkByIntegrationCode(integrationCode: string): Promise<Device> {
    console.log("CHECK DEVICE");
    const device = await this.repository.getByIntegrationCode(integrationCode);
    if (!device) {
      throw ErrorCode.DEVICE_NOT_FOUND_BY_INTEGRATION_CODE;
    }
    return device;
  }
}
