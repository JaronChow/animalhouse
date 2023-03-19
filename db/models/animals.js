const client = require('../client');
const { createOrderItem } = require('./order_items');
const { createOrder } = require('./customer_orders')

async function createAnimal({ categoryId, breed_name, image_url, description, male_inventory, female_inventory, price }) {
  try {
    const { rows: [ animal ]} = await client.query(`
        INSERT INTO animals ("categoryId", breed_name, image_url, description, male_inventory, female_inventory, price)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
        `, [categoryId, breed_name, image_url, description, male_inventory, female_inventory, price]
    );
    return animal;
  } catch (error) {
    console.log(error);
  }
}

async function getAllAnimals() {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT animal_categories.*, animals.* 
      FROM animals
      JOIN animal_categories ON animal_categories.id = animals."categoryId";
    `);
    return rows;
  } catch (error) {
    console.log("Error getting categories!")
  }
}

async function getAllAnimalsByCategoryId(id) {
  try{
    const { rows: animals } = await client.query(`
      SELECT animal_categories.*, animals.* 
      FROM animals
      JOIN animal_categories ON animal_categories.id = animals."categoryId"
      WHERE animal_categories.id =${id};
    `);

    return animals;
  } catch (error) {
    console.log("Error getting animals by category id!")
  }
}

async function getAllAnimalsByCategoryName(category_name) {
  try{
    const { rows: animals } = await client.query(`
      SELECT animal_categories.category_name, animals.* 
      FROM animals
      JOIN animal_categories ON animal_categories.id = animals."categoryId"
      WHERE animal_categories.category_name = $1;
    `, [category_name]);
  
    return animals;
  } catch (error) {
    console.log("Error getting animals by category_name!")
  }
}

async function getAnimalById(category_name, id) {
  try{
    const { rows: [ animal ] } = await client.query(`
    SELECT animal_categories.category_name, animals.* 
    FROM animals
    JOIN animal_categories ON animal_categories.id = animals."categoryId"
    WHERE animal_categories.category_name = $1 AND animals.id = $2;
    `, [category_name, id]);

    return animal;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

async function getAnimalId(id){
  try{
    const { rows: [ animal ] } = await client.query(`
      SELECT animals.id, animals."categoryId", animals.breed_name, animals.image_url, animals.description, animals.price, animals.male_inventory, animals.female_inventory 
      FROM animals
      WHERE id = $1;
    `, [id]);
    return animal;
  } catch (error) {
    console.log("Unable to get animal")
  }
}

async function attachAnimalsToOrderItems(animalId, customerId, orderId, quantity=1){
  const returnAnimal = await getAnimalId(animalId);
  try {
    if (!orderId) {   
      const order = await createOrder({
        customerId, 
        total_item_amount:0,
        shipping_fee: 0,
        order_total_amount:0,
        order_date: new Date(),
        order_status: 'Pending'
      });
      orderId = order.id;
      console.log(order, 'order')
    }
    const newOrderItem = await createOrderItem({ animalId: returnAnimal.id, customerId, orderId, quantity });
    console.log(newOrderItem, 'new order item')
    console.log(customerId, 'customerId')
    const productId = newOrderItem.map(item => item.id);
    const insertValues = newOrderItem.map((_,index) => `$${index + 1}`).join (', ');

    const { rows : order_item } = await client.query(` 
      SELECT animals.id, animals."categoryId", animals.breed_name, animals.image_url, animals.description, animals.price,
      order_items.*, users.id
      FROM animals
      JOIN order_items ON order_items."animalId" = animals.id
      JOIN users ON order_items."customerId" = users.id
      WHERE order_items.id = ${insertValues} AND order_items."customerId" = users.id
    ;`, productId);
    console.log(order_item, 'orderItem')
    return order_item;

  } catch (error) {
    console.log(error);
  }
}



async function updateAnimal({ id, ...fields }) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
      const { rows: [ animal ] } = await client.query(`
        UPDATE animals
        SET ${ setString }
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));

  return animal;
  } catch (error) {
    console.log("Error updating the animal!")
  }
}

async function deleteAnimal(id) {
  const { rows: [animal] } = await client.query(`
  DELETE FROM animals
  WHERE id = $1
  RETURNING *;
  `, [id]);

  return animal;
}

module.exports = {
  createAnimal,
  getAllAnimals,
  getAllAnimalsByCategoryId,
  getAllAnimalsByCategoryName,
  getAnimalById,
  getAnimalId,
  attachAnimalsToOrderItems,
  updateAnimal,
  deleteAnimal
}