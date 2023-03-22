import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Table, Image } from "react-bootstrap";
import "../style/App.css";
import CheckoutNavigation from "./CheckoutNavigation";
import jwt_decode from "jwt-decode";
import { getCustomerCart, getShippingInfo } from "../api/API";

const OrderSummary = () => {
  const { token } = useOutletContext();
  const { id } = jwt_decode(token);
  const [ customerId ] = useState(id);
  const [lineItems, setLineItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [consolidatedCart, setConsolidatedCart] = useState([]); 

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

  useEffect(() => {
    const consolidatedCart = lineItems.reduce((accumulator, current) => {
      const existingItemIndex = accumulator.findIndex((item) => item.animalId === current.animalId);
      if (existingItemIndex === -1) {
        accumulator.push({...current , totalQuantity: current.quantity, 
          totalPrice: current.price * current.quantity, maleQuantity: current.male_inventory  ? current.quantity : 0, 
          femaleQuantity: current.female_inventory  ? current.quantity : 0});
      } else {
        accumulator[existingItemIndex].totalQuantity += current.quantity;
        accumulator[existingItemIndex].totalPrice += current.price * current.quantity;
        if (current.gender === 'male') {
          accumulator[existingItemIndex].maleQuantity += current.quantity;
        } else {
          accumulator[existingItemIndex].femaleQuantity += current.quantity;
        }
      }
      return accumulator;
    }, []);
    setConsolidatedCart(consolidatedCart);
  }, [lineItems]);

  const getShipping = async() => {
    const response = await getShippingInfo(customerId, token);
    console.log(response, 'this response');
    setShippingInfo(response.data);
  } 
  console.log(shippingInfo, 'this is shipping info');

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Row className="justify-content-between">
      <Col md={6} style={{ width: '450px'}}>
        <h2 className="mt-4 ms-4" style={{ fontSize: '30px' }}>Shipping Information</h2>
        <ul key={shippingInfo.id}>
          <li className="mt-5" style={{ fontSize: '22px', listStyle: 'none' }}>{shippingInfo.address}</li>
          <li className="mt-2" style={{ fontSize: '22px', listStyle: 'none' }}>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipcode}</li>
          <li className="mt-2" style={{ fontSize: '22px', listStyle: 'none' }}>United States</li>
        </ul>
      <Form action={`/create-checkout-session/${customerId}`} method="POST">
        <Row>
          <Col className="mt-4 my-4"><CheckoutNavigation /></Col>
          <Col className="mt-4 mx-4">
            <Button style={{ maxWidth: '9rem'}} type="submit" variant="primary">Continue To Payment</Button>
          </Col>
        </Row>
      </Form>
      </Col>
        <Card md={6} style={{ width: '600px'}}>
          <Card.Title className="mt-4 text-center" style={{ fontSize: '30px' }}>Order Summary</Card.Title>
          <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    lineItems.map(lineItem => (
                      <tr key={lineItem.id}>
                        <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <p>{lineItem.breed_name}</p>
                          <Image style={{ width: '100px', height: 'auto', marginTop: '10px' }} src={lineItem.image_url} rounded />
                        </td>
                        <td>{lineItem.quantity}</td>
                        <td>{lineItem.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
                </Table>
                <Table>
                <tfoot >
                  <tr>
                    <td colSpan = '4'></td>
                    <td> SubTotal:</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan = '4'></td>
                    <td> Tax (7.25%):</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice * 0.0725), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan = '4'></td>
                    <td> Order Total:</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice * 0.0725) + totalPrice, 0).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
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
