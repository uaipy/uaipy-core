import User from "src/domain/model/user";
import { UserDataSource } from "../interface/data-source/userDataSource";
import { SQLDatabaseWrapper } from "../interface/sqlDatabaseWrapper";


export default class PGUserDataSource implements UserDataSource {
  private db: SQLDatabaseWrapper;
  private DB_TABLE = "user";

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  private adaptToDomain = (item: any): User => {
    return new User(
      item.name,
      item.email,
      item.password,
      item.details,
      item.uuid,
      item.created_at,
      item.updated_at,
      item.deleted_at,
      item.active,
      item.id
    );
  };

  private adaptBatchToDomain = (itens: any[]): User[] =>
    itens.map(
      (item) =>
        new User(
          item.name,
          item.email,
          item.password,
          item.details,
          item.uuid,
          item.created_at,
          item.updated_at,
          item.deleted_at,
          item.active,
          item.id
        )
    );

  async create(user: User): Promise<User> {
    const dbResponse = await this.db.query(
      `INSERT INTO ${this.DB_TABLE} VALUES (
          DEFAULT,$1,$2,$3, $4, $5, $6, $7, $8, $9
          ) RETURNING *;`,
      [
        user.getName(),
        user.getEmail(),
        user.getPassword(),
        user.getDetails(),
        user.getUuid(),
        user.getCreatedAt(),
        user.getUpdatedAt(),
        user.getDeletedAt(),
        user.isActive(),
      ]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async getAll(): Promise<User[]> {
    const dbResponse = await this.db.query(
      `select * from ${this.DB_TABLE} where active = true ORDER BY created_at DESC;`
    );
    return this.adaptBatchToDomain(dbResponse.rows);
  }
}
