const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { requireCustomer } = require("./utils")
const { JWT_SECRET } = process.env;

const {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername,
    attachCustomerToCustomerSales
} = require ('../db')

router.get('/', async (req, res) => {
    const allUsers = await getAllUsers();
    res.send(allUsers);
});

router.post('/register', async (req, res, next) => {
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
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1m'});
          res.send({ 
            message: "Thank you for signing up",
            token,
            user
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
    const user = await getUser({ username, password });
        if (!user) {
            res.send({message:'Please Register'}) 
        }
        if (user) { 
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {expiresIn: '1m'}); 
            res.send({
                user,
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
  

// GET /api/users/:userId

router.get('/:userId', async (req, res, next) => {
    const { id } = req.params

    if(req.user.id == id){
      try {
          const sales = await getAllSalesByuser({ id })
          console.log(sales)
          res.send(sales)
    } catch({name, message}) {
        next({name, message});
      }
    }
});
  

module.exports = router;