const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { requireCustomer } = require("./utils")
const { JWT_SECRET } = process.env;

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    getAllSalesByCustomer,
    getCustomerByUsername,
} = require ('../db')

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _customer = await getCustomerByUsername(username);
        if (password.length < 8) {
            res.send({
                error: "error",
                message: "Password Too Short!",
                name: "PasswordLengthError",
            })
        }
        if (_customer) {
            res.send({
                error: "error",
                message: `User ${username} is already taken.`,
                name: 'UserExistsError',
            });
        }
        const customer = await createCustomer({username,password});  
        const token = jwt.sign({id: customer.id, username: customer.username},JWT_SECRET,{expiresIn: '1w'});
          res.send({ 
            message: "thank you for signing up",
            token,
            customer
        });
        
        } catch ({ error,name,message }) {
          next({ error,name,message })
        } 
      });

router.post('/login', async (req, res, next) => {
    const { username , password } = req.body;
    
    if (!username || !password) {
        next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
        });
    }
    try {
    const customer = await getCustomers({ username, password });
        if (!customer) {
            res.send({message:'Customer exists'}) 
        }
        if (customer) { 
            const token = jwt.sign({ id: customer.id, username: customer.username }, JWT_SECRET, {expiresIn:"1w"});   // keep the id and username in the token
            res.send({
                customer,
                message: "You're logged in!", 
                token
            });
        } else { 
            next({
                name:'IncorrectCredentialsError',
                message:'Username or password is incorrect'
            });
        }
    } catch ({name, message}) {
        next ({name, message});
    }
});

// GET /api/customers/me

router.get('/me', requireCustomer,async (req, res, next) => {
    const customer = req.customer
    try {
      if (!req.customer){
        res.send({
          error:"Unauthorized",
          name:"UnauthorizedUser",
          message: "You must be logged in as customer to perform this action"
      });
      } else {
        res.send(
          customer
        );
      }
    } catch({error,name, message}) {
      next({error,name, message});
    }
});
  

// GET /api/customers/:username/:customerId

router.get('/:username/:customerId', async (req, res, next) => {
    const { username } = req.params

    if(req.customer.username == username){
      try {
          const sales = await getAllSalesByCustomer({username})
          console.log(sales)
          res.send(sales)
    } catch({name, message}) {
        next({name, message});
      }
    }
});
  

module.exports = router;