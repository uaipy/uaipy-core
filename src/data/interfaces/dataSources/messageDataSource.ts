import Message from "../../../domain/model/message";

export interface MessageDataSource {
  create(message: Message): Promise<Message>;
}
