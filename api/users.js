const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { requireCustomer } = require("./utils")
const { JWT_SECRET } = process.env;
const {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername,
    attachCustomerToCustomerSales
} = require ('../db');
const { reset } = require("nodemon");
const { getAllCustomerOrdersByCustomerId } = require("../db/models/customer_orders");

router.get('/', async (req, res) => {
    const allUsers = await getAllUsers();
    res.send(allUsers);
});

router.post('/register/customer', async (req, res, next) => {
    const { role, firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode } = req.body;

    try {
        const _user = await getUserByUsername(username);
        if (password.length < 8) {
          res.send({
              error: "error",
              message: "Password Too Short!",
              name: "PasswordLengthError",
          })
        }
        if (_user) {
          res.send({
              error: "error",
              message: `User ${username} is already taken.`,
              name: 'UserExistsError',
          });
        }
        const user = await createUser({ role, firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode});  
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '28d'});
          res.send({ 
            message: "Thank you for signing up",
            token,
            user
        });
        
    } catch ({ error,name,message }) {
        next({ error,name,message })
    } 
});

router.post('/login/customer', async (req, res, next) => {
    const { username , password } = req.body;
    
    console.log(req.body ,' username, pass')

    if (!username || !password) {
        next({
        name: "Missing Credentials Error",
        message: "Please supply both a username and password"
        });
    }
    try {
        const user = await getUser({ username, password });
        if(!user) {
            res.send({
              name: 'Incorrect Credentials Error',
              message: 'Username or password is incorrect',
            })
          }
           else {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '28d' });
            res.send({ 
                user,
                message: "You're logged in!", 
                token 
            });
          }
        } catch ({name, message}) {
        next ({name, message});
    }
});


// GET /api/users/me

router.get('/me', requireCustomer,async (req, res, next) => {
    const user = req.user
    try {
      if (!req.user){
        res.send({
          error:"Unauthorized",
          name:"UnauthorizedUser",
          message: "You must be logged in as user to perform this action"
      });
      } else {
        res.send(
          user
        );
      }
    } catch({error,name, message}) {
      next({error,name, message});
    }
});
  

// GET /api/users/:id

router.get('/:customerId', requireCustomer, async (req, res, next) => {
    const { customerId } = req.params
    console.log(req.user, 'this is req.user');

    if(req.user.id === customerId){
      try {
          const orders = await getAllCustomerOrdersByCustomerId({ customerId })
          console.log(orders)
          res.send(orders)
    } catch({name, message}) {
        next({name, message});
      }
    }
});

router.get('/:id', requireCustomer, async (req, res, next) => {
  const { id } = req.params;

  if (id === req.user.id) {
    try {
      const user = await getUserById(id);
      res.send(user);
    } catch({name, message}) {
      next({name, message});
    }
  } 
})
  

module.exports = router;