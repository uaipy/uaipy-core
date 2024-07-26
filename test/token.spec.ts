import Token, { TokenPayload } from "../src/domain/model/token";
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import Environment from "../src/utils/environment";
import jwt from "jsonwebtoken";
import ErrorCode from "../src/utils/errors/error";
import { mockEnvironment } from "./mocks/environment";

describe("Token Class", () => {
  const payload: TokenPayload = { userId: "123", email: "test@example.com" };
  const secretKey = mockEnvironment.TOKEN_SECRET_KEY;

  beforeAll(() => {
    // Mock the Environment.getValues() method
    jest.spyOn(Environment, "getValues").mockReturnValue(mockEnvironment);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should sign a token correctly", () => {
    const token = Token.sign(payload);
    expect(typeof token).toBe("string");

    // Decode the token to verify its contents
    const decoded = jwt.verify(token, secretKey) as TokenPayload;
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
  });

  it("should verify a token correctly", () => {
    const token = Token.sign(payload);
    const decoded = Token.verify(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
  });

  it("should throw an error for an invalid token", () => {
    const invalidToken = "invalid.token.here";
    expect(() => {
      Token.verify(invalidToken);
    }).toThrow(ErrorCode.INVALID_ACCESS_TOKEN);
  });
});
