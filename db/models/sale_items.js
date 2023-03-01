const client = require('../client');

async function createSaleItem({ animalId, orderId, quantity }) {
  try {
    const { rows: [ sale_item ] } = await client.query(`
        INSERT INTO sale_items("animalId", "orderId", quantity)
        VALUES($1, $2, $3)
        ON CONFLICT("animalId", "orderId") DO NOTHING
        RETURNING *;
      `, [animalId, orderId, quantity]);
    return sale_item;
  } catch (error) {
    console.error(error);
  }
}

async function getAllSalesItemsByCustomerId(id) {
  
  try {
    const { rows:  sale_items } = await client.query(`
      SELECT customers.id, customers.firstname, customers.lastname, customers.username, 
      customer_sales."customerId",
      customer_sales.total_item_amount, 
      customer_sales.shipping_fee, customer_sales.sales_total_amount, 
      customer_sales.sales_date,
      animals.breed_name,animals.image_url,animals."categoryId", animals.description, animals.inventory_count,
      animals.price, animals.gender,
      sale_items."animalId", sale_items."orderId", sale_items.quantity
      FROM customers
      INNER JOIN customer_sales ON customer_sales."customerId"=customers.id
      INNER JOIN sale_items ON sale_items."orderId" = customer_sales."customerId"
      INNER JOIN animals ON sale_items."animalId" = animals.id
      WHERE customer_sales."customerId" = $1;
      `,[id]);
      return sale_items;
  } catch (error) {
    console.error(error);
  } 
}


module.exports = {
  createSaleItem,
  getAllSalesItemsByCustomerId

};