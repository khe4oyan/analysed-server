// libs
import 'dotenv/config';

// config
const SQL_HOST = process.env.SQL_HOST;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_DB_NAME = process.env.SQL_DB_NAME;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      host: SQL_HOST,
      user: SQL_USER,         
      password: SQL_PASSWORD,
      database: SQL_DB_NAME
    },
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: SQL_HOST,
      user: SQL_USER,         
      password: SQL_PASSWORD,
      database: SQL_DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: SQL_HOST,
      user: SQL_USER,         
      password: SQL_PASSWORD,
      database: SQL_DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
