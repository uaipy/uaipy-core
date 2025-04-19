import { TestUser } from "../mocks/userMock";

export class UserBuilder {
  private user: TestUser;
  private id?: number;

  constructor(email: string, active: boolean) {
    this.user = TestUser.createWithId(
      "any-name",
      email,
      "any-password",
      "any-details",
      active,
      1
    );
  }

  withId(id: number): UserBuilder {
    this.id = id;
    this.user = TestUser.createWithId(
      this.user.getName(),
      this.user.getEmail(),
      this.user.getPassword(),
      this.user.getDetails(),
      this.user.isActive(),
      id
    );
    return this;
  }

  build(): TestUser {
    return this.user;
  }
}