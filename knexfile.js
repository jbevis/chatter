// Update with your config settings.

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/chatter_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  development: {
    client: 'pg',
    connection: 'postres://localhost/chatter',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
