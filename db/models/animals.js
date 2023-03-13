const client = require('../client');

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
      SELECT * 
      FROM animals
      WHERE id =${id};
    `);

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

async function attachAnimalsToOrderItems(order_item){
  const returnOrderItems = [...order_item];
    console.log(returnOrderItems,'order_item');
  const productId = order_item.map(item => item.id);
  const insertValues = order_item.map((_,index) => `$${index + 1}`).join (', ');

  try {
  const { rows: animals } = await client.query(` 
    SELECT animals."categoryId", animals.breed_name, animals.image_url, animals.description, animals.price, animals.gender,
    order_items.*
    FROM animals
    JOIN order_items ON order_items."animalId" = animals.id
    WHERE order_items."animalId" IN (${insertValues})
  ;`, productId);

  for (let i = 0 ; i < animalCopy.length; i++){
    const addAnimalsInfo = animalCopy.filter (animal => animal.id === animalCopy[i].id);
    animalCopy[i].animals = addAnimalsInfo;
    console.log(animals.id, 'animalid')
  } 

  return returnOrderItems;
  }catch (error){
    console.log(error)
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
  getAnimalById,
  getAnimalByGender,
  attachAnimalsToOrderItems,
  updateAnimal,
  deleteAnimal
}