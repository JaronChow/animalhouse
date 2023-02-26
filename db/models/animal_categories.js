const client = require('../client');

async function createCategory({ category_name }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ category ] } = await client.query(`
      INSERT INTO animal_categories(category_name)
      VALUES($1)
      RETURNING *;
    `, [category_name]);

    return category;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCategories() {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM animal_categories;
    `);

    return rows;
  } catch (error) {
    console.log("Error getting categories!")
  }
}

async function getCategoryById(id) {
  try{
    const { rows: [ category ] } = await client.query(`
      SELECT * 
      FROM animal_categories
      WHERE id =${id};
    `);

    return category;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

module.exports = {
  // add your database adapter fns here
  createCategory,
  getAllCategories,
  getCategoryById
};
