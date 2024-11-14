import Device from "../../domain/model/device";
import { DeviceDataSource } from "../interfaces/dataSources/deviceDataSource";
import { SQLDatabaseWrapper } from "../interfaces/sqlDatabaseWrapper";

export default class PGDeviceDataSource implements DeviceDataSource {
  private db: SQLDatabaseWrapper;
  private DB_TABLE = "public.tb_device";

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  private adaptToDomain = (item: any): Device => {
    return new Device(
      item.orquestration_id,
      item.integration_code,
      item.uuid,
      item.name,
      item.type,
      item.created_at,
      item.updated_at,
      item.active,
      item.deleted_at,
      item.id
    );
  };

  private adaptBatchToDomain = (itens: any[]): Device[] =>
    itens.map(
      (item) =>
        new Device(
          item.orquestration_id,
          item.integration_code,
          item.uuid,
          item.name,
          item.type,
          item.created_at,
          item.updated_at,
          item.active,
          item.deleted_at,
          item.id
        )
    );

    async create(device: Device): Promise<Device> {
      const dbResponse = await this.db.query(`
        INSERT INTO ${this.DB_TABLE} (
          id, orquestration_id, integration_code, uuid, name, type, created_at, updated_at, active, deleted_at
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9
        ) RETURNING *;
      `, [
        device.getOrquestrationId(),
        device.getIntegrationCode(),
        device.getUuid(),
        device.getName(),
        device.getType(),
        device.getCreatedAt(),
        device.getUpdatedAt(),
        device.isActive(),
        device.getDeletedAt(),
      ]);
      return this.adaptToDomain(dbResponse.rows[0]);
    }

  async getByUuid(uuid: string): Promise<Device> {
    const dbResponse = await this.db.query(`select * from ${this.DB_TABLE} as u where u.uuid=$1;`,       [
      uuid,
    ]);
    console.log(dbResponse.rows);
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async getByIntegrationCode(integrationCode: string): Promise<Device> {
    try{
      console.log("CHECK DEVICE GET BY INTEGRATION CODE");
      const dbResponse = await this.db.query(`select * from ${this.DB_TABLE} as u where u.uuid=$1;`,       [
        integrationCode,
      ]);
      console.log(dbResponse.rows);
      return this.adaptToDomain(dbResponse.rows[0]);
    }catch(error){
      console.log(error)
      throw new Error("ERRROOOOO")
    }
  }

  async getAll(): Promise<Device[]> {
    const dbResponse = await this.db.query(`select * from ${this.DB_TABLE};`);
    console.log(dbResponse.rows);
    return this.adaptBatchToDomain(dbResponse.rows[0]);
  }
}
