// This is the Web Server

// NEED TO ADD ENV FOR API_HOST ONCE DEPLOYED TO RENDER
const API_HOST = process.env.API_HOST || 'https://animalhouse.onrender.com' || 'http://localhost:3000';
require('dotenv').config();
const express = require('express');
const server = express();
const { getAllOrderItemsByCustomerId } = require('./db/models/order_items');

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
server.use(cors());

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

const stripe = require('stripe')(process.env.STRIPE_KEY);
// already  have one being setup, how to add
server.use(express.static('public'));

server.post('/create-checkout-session/:customerId', async (req, res) => {
  const id = req.params.customerId;
  const lineItems = await getAllOrderItemsByCustomerId(id);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems.map(item => {
      return {
        price_data: {
          currency: 'USD',
          product_data: {
            name: item.breed_name,
            description: item.description,
            images: [item.image_url]
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity,
        tax_rates: ['txr_1Mnal0Em9t2gXZv4xQV5qfEN']
      }
    }),
    mode: 'payment',
    success_url: `${API_HOST}/thankYouPage`,
    cancel_url: `${API_HOST}/home`,
  });
  res.redirect(303, session.url);
});

// here's our API
server.use('/api', require('./api'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// bring in the DB connection
const { client } = require('./db');

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
