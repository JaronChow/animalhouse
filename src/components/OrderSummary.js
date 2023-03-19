import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../style/App.css";
import CheckoutNavigation from "./CheckoutNavigation";
import jwt_decode from "jwt-decode";
import { getCustomerCart, getShippingInfo } from "../api/API";

const OrderSummary = () => {
  // const [lineItems, setLineItems] = useState(location.state.data);
  // console.log(location, 'this is orderSummary');
  const token = localStorage.getItem('token');
  const { id } = jwt_decode(token);
  const [ customerId ] = useState(id);
  const [lineItems, setLineItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState([]);
  // console.log(lineItems, 'lineitems from ordersummary');

  useEffect(() => {
    try {
        getCustomerCart(token, customerId).then((results) => {
            setLineItems(results.data);
        });
        getShipping();
    } catch (error) {
        console.error(error);
    }
  }, [token, customerId]);

  const getShipping = async() => {
    const response = await getShippingInfo(customerId, token);
    console.log(response, 'this response');
    setShippingInfo(response.data);
  } 
  console.log(shippingInfo, 'this is shipping info');

  return (
    <section>
      <h1>Order Summary</h1>
      <div>
        <h2>Cart</h2>
        {
          lineItems.length > 0 ? 
            lineItems.map(lineItem => {
              return (
                <ul key={lineItem.id}>
                <li>{lineItem.breed_name}</li>
                <li>Product Details: {lineItem.description}</li>
                <li><img src={lineItem.image_url}/></li>
                <li>$ {lineItem.price}</li>
                <li>Qty: {lineItem.quantity}</li>
              </ul>
              )
            }) : null
        }
        <h2>Shipping Information</h2>
        <ul key={shippingInfo.id}>
          <li>{shippingInfo.address}</li>
          <li>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipcode}</li>
          <li>United States</li>
        </ul>
      </div>
      <form action="/create-checkout-session" method="POST">
        <CheckoutNavigation />
        <Button type="submit" variant="primary">
          Continue To Payment
        </Button>
      </form>
    </section>
  )
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Stripe() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <OrderSummary />
  );
}
