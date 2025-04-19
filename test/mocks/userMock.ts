import User from "../../src/domain/model/user";

export class TestUser extends User {
  constructor(
    name: string,
    email: string,
    password: string,
    details: string,
    uuid: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    deletedAt?: Date,
    id?: number
  ) {
    super(name, email, password, details, uuid, createdAt, updatedAt, active, deletedAt, id);
  }
  static createWithId(
    name: string,
    email: string,
    password: string,
    details: string,
    active: boolean,
    id: number
  ): TestUser {
    return new TestUser(
      name,
      email,
      password,
      details,
      "test-uuid",
      new Date(),
      new Date(),
      active,
      undefined,
      id
    );
  }
}