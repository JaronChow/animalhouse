const client = require('../client');
const { attachAnimalsToOrderItems } = require('./animals')

async function createOrderItem({ animalId, customerId, orderId, quantity }) {
  try {
    const { rows } = await client.query(`
        INSERT INTO order_items ("animalId", "customerId", "orderId", quantity)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [animalId, customerId, orderId, quantity]);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrderItemsByCustomerId(customerId) {
  try {
    const { rows: [order_items] } = await client.query(`
    SELECT users.id, users.firstname, users.lastname, users.username, 
    animals.breed_name,animals.image_url,animals."categoryId", animals.description, animals.price, animals.gender,
    order_items."animalId", order_items."customerId", order_items."orderId", order_items.quantity
    FROM users
    JOIN order_items ON order_items."customerId" = users.id
    JOIN animals ON order_items."animalId" = animals.id
    WHERE order_items."customerId" = $1;
    `, [customerId]);
    return order_items;
  } catch (error) {
    console.error(error);
  } 
}

// async function attachOrderItemToCustomerOrder(order_item) {
//   const returnCustomerorderItems = [...order_item];
//   const customer_orderIds = order_item.map(order_item => order_item.id);
//   const insertValues = order_item.map((_,index) => `$${index + 1}`).join (', ');
//   try {
//     const { rows: order } = await client.query(
//       `
//         SELECT customer_orders.*, customer_order.*
//         FROM customer_orders
//         JOIN customer_orders ON "orderId" = customer_orders.id
//         WHERE customer_orders."orderId" IN (${insertValues})
//       `, customer_orderIds);
//     for (let i = 0 ; i < returnCustomerorderItems.length; i++){
//       const addCustomerOrdersInfo = order.filter (order => order.id === returnCustomerorderItems[i].id);
//       returnCustomerorderItems[i].order = addCustomerordersInfo;
//     }
//     return returnCustomerorderItems;
//   } catch (error) {
//     console.error(error);
//   } 
// }


module.exports = {
  createOrderItem,
  getAllOrderItemsByCustomerId
};