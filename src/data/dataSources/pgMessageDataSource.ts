import Message from "../../domain/model/message";
import { MessageDataSource } from "../interfaces/dataSources/messageDataSource";
import { SQLDatabaseWrapper } from "../interfaces/sqlDatabaseWrapper";

export default class PGMessageDataSource
  implements MessageDataSource
{
  private db: SQLDatabaseWrapper;
  private DB_TABLE = "public.tb_message";

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  private adaptToDomain = (item: any): Message => {
    return new Message(
      item.device_id,
      item.data,
      item.local_reading_date,
      item.created_at,
      item.updated_at,
      item.active,
      item.deleted_at,
      item.id
    );
  };

  private adaptBatchToDomain = (itens: any[]): Message[] =>
    itens.map(
      (item) =>
        new Message(
          item.device_id,
          item.data,
          item.local_reading_date,
          item.created_at,
          item.updated_at,
          item.active,
          item.deleted_at,
          item.id
        )
    );

  async create(message: Message): Promise<Message> {
    const dbResponse = await this.db.query(
      `INSERT INTO tb_message (
          id, device_id, data, local_reading_date, created_at, updated_at, active
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6
        ) RETURNING *;`,
      [
        message.getDeviceId(),          
        message.getData(),             
        message.getLocalReadingDate(),   
        message.getCreatedAt(),   
        message.getUpdatedAt(),    
        message.isActive()         
      ]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async getByDeviceId(id: number): Promise<Message[]> {
    const dbResponse = await this.db.query(
      `select * from ${this.DB_TABLE} as m where m.device_id=$1 ORDER BY created_at DESC LIMIT 5;`,
      [id]
    );
    console.log(dbResponse.rows);
    return this.adaptBatchToDomain(dbResponse.rows);
  }

  async getAll(): Promise<Message[]> {
    const dbResponse = await this.db.query(`select * from ${this.DB_TABLE};`);
    console.log(dbResponse.rows);
    return this.adaptBatchToDomain(dbResponse.rows);
  }
}
