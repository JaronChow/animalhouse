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

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  getAnimalByGender,
  updateAnimal
}