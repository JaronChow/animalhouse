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

// async function attachCustomerSaleToSaleItem(sale_items) {
//   const newSaleItems = {...sale_items};
//   const bind = [sale_items].map((element, index) => `$${index + 1}`).join(', ');
//   const saleItemIds = [sale_items].map(sale_item => sale_item.id);

//   try {
//     const { rows: [ sale ] } = await client.query(
//       `
//         SELECT customer_sales.*, sale_items.*
//         FROM customer_sales
//         JOIN customer_sales ON sale_items."orderId"=customer_sales.id
//         WHERE customer_sales.id IN (${bind});
//       `
//     , saleItemIds);

//     // for (let i = 0; i < newSaleItems; i++) {
//     //   const filteredSales = customer_sales.filter(
//     //     sale => sale.id === newSaleItems[i].id
//     //   );

//     //   newSaleItems[i].sale = filteredSales;
//     // }

//     return newSaleItems;
//   } catch (error) {
//     console.error(error);
//   } 
// }

module.exports = {
  // add your database adapter fns here
  createSale,
  getSaleById,
  // attachCustomerSaleToSaleItem

};