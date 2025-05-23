import bcrypt from 'bcrypt';
import Environment from 'src/main/config/enviroment';

export default class Password {
  constructor() {}

  static encryptPassword = async (password: string): Promise<string> => {
    const environment = Environment.token.passwordSalt;
    const salt = await bcrypt.genSalt(environment);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
}
