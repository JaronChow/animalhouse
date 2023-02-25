module.exports = {
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a users.js file for a User model
  // and User: require('./user') here
  ...require('./user'), // adds key/values from users.js
  ...require('./sale_item'), // adds key/values from sale_item.js
  ...require('./customer_sale'), // etc
  ...require('./animal_categories') // etc
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
