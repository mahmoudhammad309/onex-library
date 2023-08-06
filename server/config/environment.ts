import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;
const nodeEnv = process.env.NODE_ENV;
const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;
if (!secretKey) {
  throw new Error('invalid Secret Key');
}

if (!nodeEnv) {
  throw new Error('invalid Node Environment');
}

let dbUrl: string | undefined;
let ssl: boolean | object = false;
switch (nodeEnv) {
  case 'development':
    dbUrl = process.env.DEV_DB_URL;
    break;
  case 'production':
    dbUrl = process.env.DATABASE_URL;
    ssl = {
      require: true,
      rejectunauthorized: false,
    };
    break;
  default:
    throw new Error('DataBase Connection Url Error');
}

export default {
  port,
  dbUrl,
  nodeEnv,
  secretKey,
  ssl,
  cloud_name,
  api_key,
  api_secret
};
