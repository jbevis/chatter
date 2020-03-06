
exports.seed = async function (knex) {
  try {
    await knex('chat').del()
      .then(function () {
        return knex('chat').insert([
          { user: 'Test Bob', message: 'Hello there.' },
          { user: 'Test Jim', message: 'Howdy!' }
        ]);
      })
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
}