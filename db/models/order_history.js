const client = require('../client');

async function createOrderItem({ animalId, orderId, quantity }) {
  try {
    const { rows: [ order_item ] } = await client.query(`
        INSERT INTO order_history("animalId", "orderId", quantity)
        VALUES($1, $2, $3)
        ON CONFLICT("animalId", "orderId") DO NOTHING
        RETURNING *;
      `, [animalId, orderId, quantity]);
    return order_item;
  } catch (error) {
    console.error(error);
  }
}

async function getAllorderItemsByCustomerId(id) {
  
  try {
    const { rows:  order_history } = await client.query(`
      SELECT users.id, users.firstname, users.lastname, users.username, 
      customer_sales."customerId",
      customer_sales.total_item_amount, 
      customer_sales.shipping_fee, customer_sales.sales_total_amount, 
      customer_sales.sales_date,
      animals.breed_name,animals.image_url,animals."categoryId", animals.description, animals.inventory_count,
      animals.price, animals.gender,
      order_history."animalId", order_history."orderId", order_history.quantity
      FROM users
      INNER JOIN customer_sales ON customer_sales."customerId"=users.id
      INNER JOIN order_history ON order_history."orderId" = customer_sales."customerId"
      INNER JOIN animals ON order_history."animalId" = animals.id
      WHERE customer_sales."customerId" = $1;
      `,[id]);
      return order_history;
  } catch (error) {
    console.error(error);
  } 
}


module.exports = {
  createOrderItem,
  getAllorderItemsByCustomerId

};