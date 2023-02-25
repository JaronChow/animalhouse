const client = require('../client');

async function createCategory({ category_name }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ category ] } = await client.query(
      `
        INSERT INTO animal_categories(category_name)
        VALUES($1)
        ON CONFLICT DO NOTHING
        RETURNING *;
      `
    , [category_name]);

    return category;
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  // add your database adapter fns here
  createCategory
};
