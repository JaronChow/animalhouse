const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {requireCustomer} = require("./utils")
const { JWT_SECRET } = process.env;

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    getCustomerByUsername,
    attachCustomerToCustomerSales

} = require ('../db')

router.post('/customers', async (req, res, next) => {
    const { username, password } = req.body;

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
        const user = await createUser({username,password});  
        const token = jwt.sign({id: user.id, username:username},JWT_SECRET,{expiresIn: '1w'});
          res.send({ 
            message: "thank you for signing up",
            token,
            user
        });
        
        } catch ({ error,name,message }) {
          next({ error,name,message })
        } 
      });