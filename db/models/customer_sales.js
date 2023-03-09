const client = require('../client');
const { attachCustomerToCustomerSales } = require('./users')  
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
        SELECT customer_sales.*, users.firstname, users.username
        FROM users
        JOIN customer_sales
        ON customer_sales."customerId" = users.id
        WHERE username = $1;
      `, [username]);
      return attachCustomerToCustomerSales(sale)
  } catch (error) {
    console.log(error)
  }
}

async function attachCustomerSaleToOrderItem(order_item) {
  const returnCustomerorderItems = [...order_item];
  const order_historyIds = order_item.map(order_item => order_item.id);
  const insertValues = order_item.map((_,index) => `$${index + 1}`).join (', ');
  try {
    const { rows: sale } = await client.query(
      `
        SELECT customer_sales.*, order_history.*
        FROM customer_sales
        JOIN order_history ON "orderId"=customer_sales.id
        WHERE order_history."orderId" IN (${insertValues})
      `, order_historyIds);
    for (let i = 0 ; i < returnCustomerorderItems.length; i++){
      const addCustomerSalesInfo = sale.filter (sale => sale.id === returnCustomerorderItems[i].id);
      returnCustomerorderItems[i].sale = addCustomerSalesInfo;
    }
    return returnCustomerorderItems;
  } catch (error) {
    console.error(error);
  } 
}

module.exports = {
  // add your database adapter fns here
  createSale,
  getSaleById,
  getAllSalesByCustomer,
  attachCustomerSaleToOrderItem
};
