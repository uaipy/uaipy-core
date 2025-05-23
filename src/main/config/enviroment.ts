import  * as env  from 'env-var';

export default {
  node: {
    env: env.get('NODE_ENV').asString() || '',
  },
  database: {
    user: env.get('DB_USER').asString() || '',
    host: env.get('DB_HOST').asString() || '',
    name: env.get('DB_NAME').asString() || '',
    password: env.get('DB_PASSWORD').asString() || '',
  },
  token: {
    secret: env.get('TOKEN_SECRET_KEY').asString() || '',
    userExpiration: env.get('USER_TOKEN_EXPIRATION').asIntPositive() || 3600,
    orquestratorExpiration: env.get('ORQUESTRATOR_TOKEN_EXPIRATION').asIntPositive() || 3600,
    passwordSalt: env.get('PASSWORD_SALT').asIntPositive() || 0
  },
};