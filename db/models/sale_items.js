const client = require('../client');
// const { attachCustomerSaleToSaleItem } = require('./customer_sales')

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

async function getSaleItemByOrderId({ orderId }) {
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        SELECT *
        FROM sale_items
        WHERE sale_items."orderId"=$1;
      `
    , [orderId]);
    // console.log(attachCustomerSaleToSaleItem(sale_item));
    // return attachCustomerSaleToSaleItem(sale_item);
    return sale_item;
  } catch (error) {
    console.error(error);
  } 
}

// const sale = await getSaleItemByOrderId({
//   animalId: 3,
//   orderId: 3,
//   quantity: 1,
//   customerId: 3,
//   total_item_amount: 30,
//   shipping_fee: 50,
//   sales_total_amount: 36.99,
//   sales_date: '2023-02-25'
// })

module.exports = {
  // add your database adapter fns here
  createSaleItem,
  getSaleItemByOrderId
};