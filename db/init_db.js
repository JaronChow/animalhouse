const {
  client,
  // declare your model imports here
  // for example, User

} = require('./');



async function dropTables() {
  console.log("Dropping All Tables...")
  // drop all tables, in the correct order
  await client.query (`
  DROP TABLE IF EXISTS sales_item;
  DROP TABLE IF EXISTS customers_sale;
  DROP TABLE IF EXISTS animals;
  DROP TABLE IF EXISTS animal_categories;
  DROP TABLE IF EXISTS customers;
  DROP TABLE IF EXISTS admins;
  `)
}
async function buildTables() {
  try {
    client.connect();

    // build tables in correct order
    await client.query(`
    CREATE TABLE admins(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR (255) NOT NULL,
      lastname VARCHAR (255) NOT NULL,      
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      phone_number INTEGER UNIQUE NOT NULL,
      email_address VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE customers(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR (255) NOT NULL,
      lastname VARCHAR (255) NOT NULL,      
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      phone_number INTEGER UNIQUE NOT NULL,
      email_address VARCHAR(255) UNIQUE NOT NULL,
      address VARCHAR(32) NOT NULL,
      city VARCHAR(20) NOT NULL,
      state VARCHAR(2) NOT NULL,
      zipcode INTEGER NOT NULL
    );
    CREATE TABLE animal_categories( 
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE animals(
      id SERIAL PRIMARY KEY,
      breed_name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255),
      "categoryId" INTEGER REFERENCES animal_categories(id),
      description TEXT NOT NULL,
      inventory_count INTEGER,
      price INTEGER NOT NULL,
      gender TEXT NOT NULL
    );
    CREATE TABLE customers_sale(
      id SERIAL PRIMARY KEY, 
      total_item_amount NUMERIC(10,2) NOT NULL,
      shipping_fee NUMERIC(5,2) NOT NULL,
      tax_amount NUMERIC(10,2) NOT NULL,
      sales_total_amount NUMERIC(10,2) NOT NULL,
      sales_date DATE NOT NULL
    );
    CREATE TABLE sales_item(
      id SERIAL PRIMARY KEY, 
      "customerId" INTEGER REFERENCES customers(id),
      "animalId" INTEGER REFERENCES animals(id),
      name VARCHAR(255) UNIQUE NOT NULL
    );
 `)
  console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
