const client = require('../client');
const { attachCustomerToCustomerSales } = require('./customers')  
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

async function getSaleById(customerId) {
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

async function getAllSalesByCustomer({ username }) {
  try {
    const { rows: [sale] } = await client.query(
      `
        SELECT customer_sales.*, customers.firstname, customers.username
        FROM customers
        JOIN customer_sales
        ON customer_sales."customerId" = customers.id
        WHERE username = $1;
      `, [username]);
      return attachCustomerToCustomerSales(sale)
  } catch (error) {
    console.log(error)
  }
}

async function attachCustomerSaleToSaleItem(sale_item) {
  const returnCustomerSalesItems = [...sale_item];
  const sale_ItemsIds = sale_item.map(sale_item => sale_item.id);
  const insertValues = sale_item.map((_,index) => `$${index + 1}`).join (', ');
  try {
    const { rows: sale } = await client.query(
      `
        SELECT customer_sales.*, sale_items.*
        FROM customer_sales
        JOIN sale_items ON "orderId"=customer_sales.id
        WHERE sale_items."orderId" IN (${insertValues})
      `, sale_ItemsIds);
    for (let i = 0 ; i < returnCustomerSalesItems.length; i++){
      const addCustomerSalesInfo = sale.filter (sale => sale.id === returnCustomerSalesItems[i].id);
      returnCustomerSalesItems[i].sale = addCustomerSalesInfo;
    }
    return returnCustomerSalesItems;
  } catch (error) {
    console.error(error);
  } 
}

module.exports = {
  // add your database adapter fns here
  createSale,
  getSaleById,
  getAllSalesByCustomer,
  attachCustomerSaleToSaleItem
};
