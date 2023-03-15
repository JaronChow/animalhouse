// grab our db client connection to use with our adapters
const client = require('../client');
const bcrpyt = require ("bcrypt");

async function createUser( {role, firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode} ){
  const SALT_COUNT = 10;
  const hashedPassword = await bcrpyt.hash(password, SALT_COUNT);

  try {
      const { rows: [user] } = await client.query(`
        INSERT INTO users (role, firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *;`,
      [role, firstname, lastname, username, hashedPassword, phone_number, email_address, address, city, state, zipcode]);
      if(user){
        delete user.password
        return user;
      }
    } catch (error) {
      console.log(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(username) {
  console.log(username, 'username')
  try {
    const { rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
      `,[username]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUser( {username, password} ) {
  console.log(username, password,'username and pass from get user')
  try {
    const user = await getUserByUsername(username);
    console.log(user.password, 'username.password')

    const hashedPassword = user.password;
    const passwordsMatch = await bcrpyt.compare(password, hashedPassword);

    console.log(password, hashedPassword , 'user passwords hashed?')
    console.log(passwordsMatch, 'password match')
    
    if (passwordsMatch) {
      delete user.password;
      console.log (user , 'user')
      return user;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id= $1;
    `,
      [userId]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
};