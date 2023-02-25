// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createCustomer,
  // getCustomers,
};

async function createCustomer ( {firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode} ){
  const SALT_COUNT = 10;
  const hashedPassword = await bcrpyt.hash(password, SALT_COUNT);

  try {
      const {
        rows: [customer],
      } = await client.query(
        `
        INSERT INTO customers (firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *
      ;`,
      [firstname, lastname, username, hashedPassword, phone_number, email_address, address, city, state, zipcode]);
      delete customer.password;
      return customer;
    } catch (error) {
      console.log(error);
  }
}

// async function getAllCustomers() {
//   /* this adapter should fetch a list of users from your db */
// }
