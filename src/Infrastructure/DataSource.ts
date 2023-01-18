import { Client } from 'pg';

export class PGClient {

  migrationDS = (): Client => new Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    user: process.env.DB_USER,
    password: process.env.PSW,
  });
}
