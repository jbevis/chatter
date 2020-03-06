
exports.up = function(knex) {
  return knex.schema
    .createTable('chat', function(table) {
      table.increments('id').primary();
      table.string('user');
      table.string('message');

      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('chat')
};
