import bcrypt from "bcrypt";
import Environment from "../../../src/utils/environment";

export default class Password {
  constructor() {}

  static encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = Environment.getValues().PASSWORD_SALT;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  static verifyPassword = (password: string): boolean => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  static verifyHash = async (
    password: string,
    hash: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  };
}
