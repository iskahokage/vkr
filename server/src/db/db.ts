import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
console.log(process.env.DB_NAME)
const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT)
});

export default sequelize;