import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import User from '../src/domain/model/user';

jest.mock("../src/utils/uuid", () => ({
  generateUuid: jest.fn(() => "test-uuid"),
}));

const { generateUuid } = require("../src/utils/uuid");

describe("User Class", () => {
  const name = "John Doe";
  const email = "john.doe@example.com";
  const password = "password123";
  const details = "Some details";
  const createdAt = new Date("2023-01-01");
  const updatedAt = new Date("2023-01-02");
  const active = true;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user instance with provided properties", () => {
    const user = new User(
      name,
      email,
      password,
      details,
      "test-uuid",
      createdAt,
      updatedAt,
      active
    );

    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getDetails()).toBe(details);
    expect(user.getUuid()).toBe("test-uuid");
    expect(user.getCreatedAt()).toEqual(createdAt);
    expect(user.getUpdatedAt()).toEqual(updatedAt);
    expect(user.isActive()).toBe(active);
    expect(user.getDeletedAt()).toBeUndefined();
  });

  it("should create a user instance using the static create method", () => {
    const user = User.create(name, email, password, details, active);

    expect(generateUuid).toHaveBeenCalled();
    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getDetails()).toBe(details);
    expect(user.getUuid()).toBe("test-uuid");
    expect(user.getCreatedAt()).toBeInstanceOf(Date);
    expect(user.getUpdatedAt()).toBeInstanceOf(Date);
    expect(user.isActive()).toBe(active);
    expect(user.getDeletedAt()).toBeUndefined();
  });

  it("should return the correct values from getter methods", () => {
    const user = new User(
      name,
      email,
      password,
      details,
      "test-uuid",
      createdAt,
      updatedAt,
      active
    );

    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getDetails()).toBe(details);
    expect(user.getUuid()).toBe("test-uuid");
    expect(user.getCreatedAt()).toEqual(createdAt);
    expect(user.getUpdatedAt()).toEqual(updatedAt);
    expect(user.isActive()).toBe(active);
    expect(user.getDeletedAt()).toBeUndefined();
  });
});
