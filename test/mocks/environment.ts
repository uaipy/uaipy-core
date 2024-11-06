import { EnvironmentValues } from "../../src/domain/interfaces/environment";

export const mockEnvironment: EnvironmentValues = {
    "NODE_ENV": "dev",
    "DB_USER": "your_user_db",
    "DB_HOST": "your_db_host",
    "DB_NAME": "your_db_name",
    "DB_PASSWORD": "your_db_password",
    "PASSWORD_SALT": 0,
    "TOKEN_SECRET_KEY": "your_token_secret_key",
    "USER_TOKEN_EXPIRATION": "1h",
    "ORQUESTRATOR_TOKEN_EXPIRATION": "1h"
} 