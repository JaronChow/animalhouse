// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const {requireAdmin} = require("./utils")
// const { JWT_SECRET } = process.env;

// const {
//     createAdmin,
//     getAdmin,
//     getAdminByUsername
// } = require ('../db')

// router.post('/register', async (req, res, next) => {
//     const { firstname, lastname, username, password, phone_number, email_address } = req.body;
//     console.log(req.body , 'req.body')

//     try {
//         const _admin = await getAdminByUsername(username);
//         if (password.length < 8) {
//             res.send({
//                 error: "error",
//                 message: "Password Too Short!",
//                 name: "PasswordLengthError",
//             })
//         }
//         if (_admin) {
//             res.send({
//                 error: "error",
//                 message: `Admin ${username} is already taken.`,
//                 name: 'UserExistsError',
//             });
//         }
//         const admin = await createAdmin({ firstname, lastname, username, password, phone_number, email_address });  
//         const adminToken = jwt.sign({id: admin.id, username: admin.username}, JWT_SECRET, {expiresIn: '1m'});
//           res.send({ 
//             message: "thank you for signing up",
//             adminToken,
//             admin
//         });
        
//         } catch ({ error,name,message }) {
//           next({ error,name,message })
//         } 
//       });

// router.post('/login', async (req, res, next) => {
//     const { username , password } = req.body;
//     console.log(req.body)
//     if (!username || !password) {
//         next({
//         name: "MissingCredentialsError",
//         message: "Please supply both a username and password"
//         });
//     }
//     try {
//     const admin = await getAdmin({ username, password });
//         if (!admin) {
//             res.send({message:'Admin logged in'}) 
//         }
//         if (customer) { 
//             const token = jwt.sign({ id: customer.id, username: customer.username }, JWT_SECRET);   // keep the id and username in the token
//             res.send({
//                 customer,
//                 message: "You're logged in!", 
//                 token
//             });
//         } else { 
//             next({
//                 name:'IncorrectCredentialsError',
//                 message:'Username or password is incorrect'
//             });
//         }
//     } catch ({name, message}) {
//         next ({name, message});
//     }
// });

// // GET /api/admins/me

// router.get('/me', requireAdmin,async (req, res, next) => {
//     const admin = req.admin
//     try {
//       if (!req.admin){
//         res.send({
//           error:"Unauthorized",
//           name:"UnauthorizedUser",
//           message: "You must be logged in as admin to perform this action"
//       });
//       } else {
//         res.send(
//           admin
//         );
//       }
//     } catch({error,name, message}) {
//       next({error,name, message});
//     }
// });

// module.exports = router;