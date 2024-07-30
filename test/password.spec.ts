import bcrypt from "bcrypt";
import Password from "../src/domain/model/password";
import { beforeAll, afterAll, beforeEach, describe, expect, it, jest } from "@jest/globals";
import Environment from "../src/utils/environment";
import { mockEnvironment } from "./mocks/environment";

// Mocking the bcrypt module
jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("Password Class", () => {
  const password = "password123";
  const shortPassword = "short";
  const hash = "hashedpassword";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // Mock the Environment.getValues() method
    jest.spyOn(Environment, "getValues").mockReturnValue(mockEnvironment);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  it("should encrypt the password", async () => {
    const saltRounds = mockEnvironment.PASSWORD_SALT;
    const salt = "salt";
    const hash = "hashedpassword";
    mockedBcrypt.genSalt.mockImplementation(() => Promise.resolve(salt));
    mockedBcrypt.hash.mockImplementation(() => Promise.resolve(hash));

    const encryptedPassword = await Password.encryptPassword(
      password
    );

    expect(mockedBcrypt.genSalt).toHaveBeenCalledWith(saltRounds);
    expect(mockedBcrypt.hash).toHaveBeenCalledWith(password, salt);
    expect(encryptedPassword).toBe(hash);
  });

  it("should return false for passwords shorter than 8 characters", () => {
    const isValid = Password.verifyPassword(shortPassword);
    expect(isValid).toBe(false);
  });

  it("should return true for passwords with 8 or more characters", () => {
    const isValid = Password.verifyPassword(password);
    expect(isValid).toBe(true);
  });

  it("should verify the hashed password", async () => {
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(true));

    const isMatch = await Password.verifyHash(password, hash);

    expect(mockedBcrypt.compare).toHaveBeenCalledWith(password, hash);
    expect(isMatch).toBe(true);
  });

  it("should return false when hashed password does not match", async () => {
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(false));

    const isMatch = await Password.verifyHash(password, hash);

    expect(mockedBcrypt.compare).toHaveBeenCalledWith(password, hash);
    expect(isMatch).toBe(false);
  });
});
