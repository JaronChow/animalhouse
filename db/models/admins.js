const client = require("./client");
const bcrpyt = require("bcrypt");

module.exports ={
    createAdmin,
    getAdmin,
    getAdminById,
    getAdminByUsername
}

async function createAdmin ( {firstname, lastname, username, password, phone_number, email_address} ){
    const SALT_COUNT = 10;
    const hashedPassword = await bcrpyt.hash(password, SALT_COUNT);

    try {
        const {
          rows: [admin],
        } = await client.query(
          `
          INSERT INTO admins (firstname, lastname, username, password, phone_number, email_address) 
          VALUES($1, $2, $3, $4, $5, $6) 
          RETURNING *
        ;`,
        [firstname, lastname, username, hashedPassword, phone_number, email_address ]);
        delete admin.password;
        return admin;
      } catch (error) {
        console.log(error);
    }
}

async function getAdmin({ username, password }) {
  try {
    const admin = await getAdminByUsername(username);
    const hashedPassword = user.password;
    let passwordsMatch = await bcrpyt.compare(password, hashedPassword);

    if (passwordsMatch) {
      // return the user object (without the password)
      delete admin.password;
      return admin;
    }
  } catch (error) {
    console.log(error);
  }
}

