const client = require('../client');

async function createSale({
  customer_salesId,
  total_item_amount,
  shipping_fee,
  tax_amount,
  sales_total_amount,
  sales_date
}) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ sale ] } = await client.query(
      `
        INSERT INTO customer_sales("customer_salesId", total_item_amount, shipping_fee, tax_amount, sales_total_amount, sales_date)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING
        RETURNING *;
      `
    , [customer_salesId, total_item_amount, shipping_fee, tax_amount, sales_total_amount, sales_date]);

    return sale;
  } catch (error) {
    console.error(error);
  }
}

// async function addSaleToSaleItem({
//   total_item_amount,
//   shipping_fee,
//   tax_amount,
//   sales_total_amount,
//   sales_date
// }) {
//   try {
//     const { rows: [ sale ] } = await client.query(
//       `
//         INSERT INTO customers_sale(total_item_amount, shipping_fee, tax_amount, sales_total_amount, sales_date)
//         VALUES($1, $2, $3, $4, $5)
//         ON CONFLICT DO NOTHING
//         RETURNING *;
//       `
//     , [total_item_amount, shipping_fee, tax_amount, sales_total_amount, sales_date]);

//     return sale;
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  // add your database adapter fns here
  createSale,
  // addSaleToSaleItem

};