// This is the Web Server
const express = require('express');
const server = express();

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

const stripe = require('stripe')('sk_test_51MjvmyEm9t2gXZv4uvW6anacgWyDCTmLTd5Y6rpZbxx7RFHzTrsbpSbTLdO16IHmR9KmgHzwf5I1n7PbcW85I6dY00vakunrZy');
// already  have one being setup, how to add
server.use(express.static('public'));

// must change to domain url later
const YOUR_DOMAIN = `http://localhost:4000`;

server.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "USD",
          product_data: {
            name: "Husky",
            description: "White and Fuzzy",
            images: "https://www.akc.org/wp-content/uploads/2017/11/Siberian-Husky-Illo.jpg"
          },
          unit_amount: 1500
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session.url, 'this is ses url');
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
