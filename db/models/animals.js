const client = require('../client');

module.exports = {
  createAnimal,
}


async function createAnimal({ breed_name, image_url, category_id, description, inventory_count, price, gender }) {
  try {
    const {
      rows: [animal],
    } = await client.query(
      `
        INSERT INTO animals ( breed_name, image_url, "category_id", description, inventory_count, price, gender )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
      ;`,
      [breed_name, image_url, category_id, description, inventory_count, price, gender]
    );
    return animal;
  } catch (error) {
    console.log(error);
  }
}
