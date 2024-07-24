export interface EnvironmentValues {
  NODE_ENV: string;
  DB_USER: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  PASSWORD_SALT: number;
  TOKEN_SECRET_KEY: string;
  TOKEN_EXPIRATION: string;
}
