import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;
const secretKey = process.env.SECRET_KEY;
const nodeEnv = process.env.NODE_ENV;

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
};
