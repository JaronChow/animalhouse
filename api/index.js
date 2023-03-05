const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db")

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
            req.user = await getUserById(user.id);
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

// ROUTER: /api/categories
const categoriesRouter = require('./animal_categories');
apiRouter.use('/animal_categories', categoriesRouter);

// ROUTER: /api/animals
const animalsRouter = require('./animals');
apiRouter.use('/animals', animalsRouter);

// ROUTER: /api/customerSales
const customerSalesRouter = require('./customer_sales');
apiRouter.use('/customer_sales', customerSalesRouter);

// ROUTER: /api/saleItems
const saleItemsRouter = require('./sale_items');
apiRouter.use('/sale_items', saleItemsRouter);


module.exports = apiRouter;
