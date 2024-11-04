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
      item.deviceId,
      item.data,
      item.message_read_date,
      item.created_at,
      item.updated_at,
      item.active,
      item.deleted_at,
      item.id
    );
  };

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
        message.getMessageReadDate(),   
        message.getCreatedAt(),   
        message.getUpdatedAt(),    
        message.isActive()         
      ]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }
  
  

  async getByUuid(uuid: string): Promise<Message> {
    const dbResponse = await this.db.query(
      `select * from ${this.DB_TABLE} as u where u.uuid=$1;`,
      [uuid]
    );
    console.log(dbResponse.rows);
    return this.adaptToDomain(dbResponse.rows[0]);
  }
}
