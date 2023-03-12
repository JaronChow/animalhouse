require('dotenv').config()
const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserByUsername } = require("../db")

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
          const user = jwt.verify(token, JWT_SECRET);

          if (user.id) {
            req.user = await getUserByUsername(user.username);

            next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${ prefix }`
      });
  }
});


// ROUTER: /api/admins

// ROUTER: /api/customers
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const shippingRouter = require('./shipping');
apiRouter.use('/shipping', shippingRouter);

// ROUTER: /api/categories
const categoriesRouter = require('./animal_categories');
apiRouter.use('/animal_categories', categoriesRouter);

// ROUTER: /api/animals
const animalsRouter = require('./animals');
apiRouter.use('/animals', animalsRouter);

// ROUTER: /api/customer_orders
const customerOrdersRouter = require('./customer_orders');
apiRouter.use('/customer_orders', customerOrdersRouter);

// ROUTER: /api/order_items
const orderItemsRouter = require('./order_items');
apiRouter.use('/order_items', orderItemsRouter);


module.exports = apiRouter;
