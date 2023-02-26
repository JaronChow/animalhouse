const apiRouter = require('express').Router();

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
          const customer = jwt.verify(token, process.env.JWT_SECRET);

          if (customer.id) {
            req.customer = await getCustomerById(customer.id);
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
const adminsRouter = require('./admins');
router.use('/admins', adminsRouter);

// ROUTER: /api/customers
const customersRouter = require('./customers');
router.use('/customers', customersRouter);

// ROUTER: /api/animal_categories
const animalCategoriesRouter = require('./animal_categories');
router.use('/animal_categories', animalCategoriesRouter);

// ROUTER: /api/animals
const animalsRouter = require('./animals');
router.use('/animals', animalsRouter);

// ROUTER: /api/customer_sales
const customerSalesRouter = require('./customer_sales');
router.use('/customer_sales', customerSalesRouter);

// ROUTER: /api/sale_items
const saleItemsRouter = require('./sale_items');
router.use('/sale_items', saleItemsRouter);


module.exports = apiRouter;
