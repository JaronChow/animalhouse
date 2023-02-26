const client = require('../client');

async function createSaleItem({ customerId, animalId, orderId, quantity }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        INSERT INTO sale_items("customerId", "animalId", "orderId", quantity)
        VALUES($1, $2, $3, $4)
        ON CONFLICT(name) DO NOTHING
        RETURNING *;
      `
    , [customerId, animalId, orderId, quantity]);

    return sale_item;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  // add your database adapter fns here
  createSaleItem
};