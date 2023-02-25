const client = require("./client");

async function createAnimals({ breed_name, image_url, category_id, description, inventory_count, price, gender }) {
  try {
    const {
      rows: [animals],
    } = await client.query(
      `
        INSERT INTO createAnimals ( breed_name, image_url, "category_id", description, inventory_count, price, gender )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
      ;`,
      [breed_name, image_url, category_id, description, inventory_count, price, gender]
    );
    return animals;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    createAnimals,
}
