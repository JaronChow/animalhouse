const client = require('../client');
async function createOrder({ customerId, total_item_amount, shipping_fee, order_total_amount, order_date, order_status }) {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: [ order ] } = await client.query(
      `
        INSERT INTO customer_orders("customerId", total_item_amount, shipping_fee, order_total_amount, order_date, order_status)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `
    , [customerId, total_item_amount, shipping_fee, order_total_amount, order_date, order_status]);
    
    return order;
  } catch (error) {
    console.error(error);
  }
}

async function getOrderById(customerId) {
  try {
    const { rows: [ order ] } = await client.query(
      `
        SELECT *
        FROM customer_orders
        WHERE customer_orders."customerId"=$1;
      `
    , [customerId]);

    return order;
  } catch (error) {
    console.error(error);
  } 
}

async function getPendingOrderByCustomerId(customerId){
  try {
    const { rows: customer_order } = await client.query(`
      SELECT users.id, users.firstname, users.lastname, users.username, 
      customer_orders.id AS "orderId", 
      customer_orders.total_item_amount, 
      customer_orders.shipping_fee, customer_orders.order_total_amount, 
      customer_orders.order_date, customer_orders.order_status,
      animals.breed_name, animals.image_url,animals."categoryId", animals.description,
      animals.price,
      order_items.id AS "orderItemId", order_items."animalId", order_items."customerId", order_items."orderId", order_items.quantity
      FROM users
      JOIN order_items ON order_items."customerId" = users.id
      JOIN customer_orders ON customer_orders.id = order_items."orderId"
      JOIN animals ON animals.id = order_items."animalId"
      WHERE order_items."customerId" = $1 
      AND customer_orders.order_status = 'Pending';  
    `, [customerId]);
    const orders = {};
    customer_order.forEach((order) => {
      const { orderId, order_total_amount } = order;
      const parsedTotalAmount = parseFloat(order_total_amount).toFixed(2);
      if (!orders[orderId]) {
        orders[orderId] = { ...order, totalAmount: parsedTotalAmount };
      } else {
        orders[orderId].totalAmount = (parseFloat(orders[orderId].totalAmount) + parseFloat(parsedTotalAmount)).toFixed(2);
      }
    });

    
    console.log(orders); // This will show you the orders and their total amounts.
    
    return orders;
  } catch (error) {
    console.error(error);
  } 
}

async function getAllCustomerOrdersByCustomerId(customerId) {
  
  try {
    const { rows: customer_order } = await client.query(`
      SELECT users.id, users.firstname, users.lastname, users.username, 
      customer_orders."customerId",
      customer_orders.total_item_amount, 
      customer_orders.shipping_fee, customer_orders.order_total_amount, 
      customer_orders.order_date, customer_orders.order_status,
      animals.breed_name,animals.image_url,animals."categoryId", animals.description, animals.male_inventory, animals.female_inventory,
      animals.price,
      order_items."animalId", order_items."customerId", order_items."orderId", order_items.quantity
      FROM users
      INNER JOIN order_items ON order_items."customerId" = users.id
      INNER JOIN customer_orders ON order_items."orderId" = customer_orders.id
      INNER JOIN animals ON animals.id = order_items."animalId"
      WHERE customer_orders."customerId" = $1;
      `,[customerId]);
      return customer_order;
  } catch (error) {
    console.error(error);
  } 
}

async function updateCustomerOrdersByCustomerId({ customerId,...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  try {
    const { rows: customer_order } = await client.query(`
      UPDATE customer_orders
      SET ${setString}
      WHERE customer_orders."customerId" = ${customerId}
      RETURNING *
    ;`, Object.values(fields))
    return customer_order
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  // add your database adapter fns here
  createOrder,
  getOrderById,
  getPendingOrderByCustomerId,
  getAllCustomerOrdersByCustomerId,
  updateCustomerOrdersByCustomerId
};
