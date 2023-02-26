const client = require('../client');

module.exports = {
  createAnimal,
}


async function createAnimal({ categoryId, breed_name, image_url, description, inventory_count, price, gender }) {
  try {
    const {
      rows: [animal],
    } = await client.query(
      `
        INSERT INTO animals ( "categoryId", breed_name, image_url, description, inventory_count, price, gender )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
      ;`,
      [categoryId, breed_name, image_url, description, inventory_count, price, gender]
    );
    return animal;
  } catch (error) {
    console.log(error);
  }
}
