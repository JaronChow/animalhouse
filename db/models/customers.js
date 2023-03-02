// grab our db client connection to use with our adapters
const client = require('../client');
const bcrpyt = require ("bcrypt")

async function createCustomer( {firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode} ){
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

async function getCustomerByUsername(username) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
      SELECT customers.username
      FROM customers
      WHERE username = $1;
    `,
      [username]
    );

    return customer;
  } catch (error) {
    console.log(error);
  }
}

async function getCustomers({ username, password }) {
  try {
    const customer = await getCustomerByUsername(username);
    const hashedPassword = customer.password;
    let passwordsMatch = await bcrpyt.compare(password, hashedPassword);

    if (passwordsMatch) {
      delete customer.password;
      return customer;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCustomerById(customerId) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
      SELECT id, username
      FROM customers
      WHERE id= $1;
    `,
      [customerId]
    );
    return customer;
  } catch (error) {
    console.log(error);
  }
}

async function  getCustomerByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM customers
      WHERE username = $1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    console.log(error);
  }
}


async function attachCustomerToCustomerSales(sale){
      const returnCustomerItems = [...sale];
      const saleIds = sale.map(sale => sale.id);
      const insertValues = sale.map((_,index) => `$${index + 1}`).join (', ');

      try {
      const {rows: customers} = await client.query(` 
        SELECT customers.id, customers.firstname, customers.lastname, customers.username, 
        customer_sales."customerId",
        customer_sales.total_item_amount, 
        customer_sales.shipping_fee, customer_sales.sales_total_amount, 
        customer_sales.sales_date
        FROM customers
        JOIN customer_sales ON customer_sales."customerId" = customers.id
        WHERE customer_sales."customerId" IN (${insertValues})
      ;`, saleIds);

      for (let i = 0 ; i < returnCustomerItems.length; i++){
        const addCustomerInfo = customers.filter (customer => customer.id === returnCustomerItems[i].id);
        returnCustomerItems[i].customers = addCustomerInfo;
      } 
      console.log(returnCustomerItems, 'returncustomers')
      return returnCustomerItems;
    }catch (error){
      console.log(error)
  }
}


module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByUsername,
  attachCustomerToCustomerSales
};