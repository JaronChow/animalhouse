const client = require('../client');

async function createSale({
  customerId,
  total_item_amount,
  shipping_fee,
  sales_total_amount,
  sales_date
}) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ sale ] } = await client.query(
      `
        INSERT INTO customer_sales("customerId", total_item_amount, shipping_fee, sales_total_amount, sales_date)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `
    , [customerId, total_item_amount, shipping_fee, sales_total_amount, sales_date]);
    
    return sale;
  } catch (error) {
    console.error(error);
  }
}

async function getSaleById({ customerId }) {
  try {
    const { rows: [ sale ] } = await client.query(
      `
        SELECT *
        FROM customer_sales
        WHERE customer_sales."customerId"=$1;
      `
    , [customerId]);
   
    return sale;
  } catch (error) {
    console.error(error);
  } 
}

async function attachCustomerSaleToSaleItem() {
  try {
    const { rows: [ sale ] } = await client.query(
      `
        SELECT customer_sales.*, sale_items.*
        FROM customer_sales
        INNER JOIN sale_items
        ON "orderId"=customer_sales.id;
      `
    );

    return sale;
  } catch (error) {
    console.error(error);
  } 
}

module.exports = {
  // add your database adapter fns here
  createSale,
  getSaleById,
  attachCustomerSaleToSaleItem
};
