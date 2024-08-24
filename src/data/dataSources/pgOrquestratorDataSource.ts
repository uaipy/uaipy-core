import Orquestrator from "../../domain/model/orquestrator";
import { OrquestratorDataSource } from "../interfaces/dataSources/orquestratorDataSource";
import { SQLDatabaseWrapper } from "../interfaces/sqlDatabaseWrapper";

export default class PGOrquestratorDataSource
  implements OrquestratorDataSource
{
  private db: SQLDatabaseWrapper;
  private DB_TABLE = "public.tb_orquestrator";

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  private adaptToDomain = (item: any): Orquestrator => {
    return new Orquestrator(
      item.name,
      item.user_id,
      item.description,
      item.uuid,
      item.created_at,
      item.updated_at,
      item.active,
      item.deleted_at,
      item.id
    );
  };

  async create(orquestrator: Orquestrator): Promise<Orquestrator> {
    const dbResponse = await this.db.query(
      `INSERT INTO ${this.DB_TABLE} VALUES (
          DEFAULT,$1,$2,$3, $4, $5, $6, $7, $8
          ) RETURNING *;`,
      [
        orquestrator.getUserId(),
        orquestrator.getName(),
        orquestrator.getDescription(),
        orquestrator.getUuid(),
        orquestrator.getCreatedAt(),
        orquestrator.getUpdatedAt(),
        orquestrator.getDeletedAt(),
        orquestrator.isActive(),
      ]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async getByUuid(uuid: string): Promise<Orquestrator> {
    const dbResponse = await this.db.query(
      `select * from ${this.DB_TABLE} as u where u.uuid=$1;`,
      [uuid]
    );
    console.log(dbResponse.rows);
    return this.adaptToDomain(dbResponse.rows[0]);
  }
}
