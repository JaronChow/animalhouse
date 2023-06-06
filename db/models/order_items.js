const client = require('../client');

async function createOrderItem({ animalId, customerId, orderId }) {
  try {
    const { rows } = await client.query(`
        INSERT INTO order_items ("animalId", "customerId", "orderId")
        VALUES($1, $2, $3)
        RETURNING *;
      `, [animalId, customerId, orderId]);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function getAllOrderItems(){
  try {
    const {rows: order_items} = await client.query(`
      SELECT * FROM order_items
    `);
    return order_items
  } catch (error) {
    console.error(error)
  }
}
async function getAllOrderItemsByCustomerId(customerId) {
  try {
    const { rows: order_items } = await client.query(`
    SELECT users.id, users.firstname, users.lastname, users.username, 
    animals.breed_name,animals.image_url,animals."categoryId", animals.description, animals.price, animals.quantity, 
    animals.gender, animals.male_inventory, animals.female_inventory,
    order_items.id, order_items."animalId", order_items."customerId", order_items."orderId"
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


async function deleteOrderItem(id) {
  const { rows: order_item } = await client.query(`
  DELETE FROM order_items
  WHERE id = $1
  RETURNING *;
  `, [id]);

  return order_item;
}

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getAllOrderItemsByCustomerId,
  deleteOrderItem
};