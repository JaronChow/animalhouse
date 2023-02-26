const client = require('../client');

async function createSaleItem({ animalId, orderId, quantity }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        INSERT INTO sale_items("animalId", "orderId", quantity)
        VALUES($1, $2, $3)
        ON CONFLICT("animalId", "orderId") DO NOTHING
        RETURNING *;
      `
    , [animalId, orderId, quantity]);
    return sale_item;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  // add your database adapter fns here
  createSaleItem
};