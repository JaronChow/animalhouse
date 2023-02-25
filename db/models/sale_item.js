const client = require('../client');

async function createSaleItem({ customerId, animalId, name }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        INSERT INTO sales_item("customerId", "animalId", name)
        VALUES($1, $2, $3)
        ON CONFLICT(name) DO NOTHING
        RETURNING *;
      `
    , [customerId, animalId, name]);

    return sale_item;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  // add your database adapter fns here
  createSaleItem
};