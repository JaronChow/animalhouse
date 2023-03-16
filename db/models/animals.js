const client = require('../client');
const { createOrderItem } = require('./order_items');
const { createOrder } = require('./customer_orders')
const { getUserById, getUserByUsername } = require('./users')

async function createAnimal({ categoryId, breed_name, image_url, description, inventory_count, price, gender }) {
  try {
    const { rows: [ animal ]} = await client.query(`
        INSERT INTO animals ("categoryId", breed_name, image_url, description, inventory_count, price, gender)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
        `, [categoryId, breed_name, image_url, description, inventory_count, price, gender]
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
      SELECT * 
      FROM animals;
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

async function getAnimalById(id) {
  try{
    const { rows: [ animal ] } = await client.query(`
      SELECT animals.id, animals."categoryId", animals.breed_name, animals.image_url, animals.description, animals.price, animals.gender 
      FROM animals
      WHERE id = $1;
    `, [id]);

    return animal;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

async function getAnimalByGender(id, gender) {
  try{
    const { rows: [ animal ] } = await client.query(`
      SELECT * 
      FROM animals
      WHERE id =${id} AND gender =${gender};
    `);

    return animal;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

async function attachAnimalsToOrderItems(animalId, customerId, orderId, quantity=1){
  const returnAnimal = await getAnimalById(animalId);
  try {
    if (!orderId) {   
      const order = await createOrder({
        customerId, 
        total_item_amount: 0,
        shipping_fee: 0,
        order_total_amount: 0,
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
      SELECT animals.id, animals."categoryId", animals.breed_name, animals.image_url, animals.description, animals.price, animals.gender,
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
    throw error;
  }
}

/// may need to use
    // const orderItem = {};

    // order_item.forEach(({ animalId, categoryId, breed_name, image_url, description, price, gender, id, customerId, orderId, quantity })=> {
    //   if (!orderItem[animalId]) {
    //     orderItem[animalId] = {
    //       order_items: [],
    //       id: animalId,
    //       categoryId: categoryId,
    //       breed_name: breed_name,
    //       image_url: image_url,
    //       description: description,
    //       price: price,
    //       gender: gender,
    //     };
    //   }
    //   orderItem[animalId].order_items.push({
    //     id: id,
    //     customerId: customerId,
    //     orderId: orderId, 
    //     quantity: quantity,
    //   });
    // });

    // const orderList = Object.values(orderItem);
    // console.log(orderList, 'animalList');

//     for (let i = 0 ; i < animal.length; i++){
//       const addAnimalInfo = animal.filter (animal => animal.id === animal[i].id);
//       animal[i].animals = addAnimalInfo;
//     } 
//     console.log(animal, 'animal')
//     return animal;
//   }catch (error){
//     console.log(error)
//   }
// }


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
  getAnimalById,
  getAnimalByGender,
  attachAnimalsToOrderItems,
  updateAnimal,
  deleteAnimal
}