// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// TODO: use .env values here

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',         
      password: '', 
      database: 'erp_test'  
    },
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',         
      password: '', 
      database: 'erp_test'  
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
      host: '127.0.0.1',
      user: 'root',         
      password: '', 
      database: 'erp_test'  
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
