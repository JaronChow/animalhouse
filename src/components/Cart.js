import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext } from 'react-router-dom';
import { getCustomerCart } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";
import DeleteProduct from "./DeleteProduct";
import { Card, Button } from "react-bootstrap";

const Cart = () => {
    const token = localStorage.getItem('token');
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [cart, setCart] = useState([]);    

    useEffect(() =>{
        getCart()
    }, [token, customerId]);

    const getCart = async () =>{
        const response = await getCustomerCart(token,customerId);
        // console.log(response.data, 'response.data')
        setCart(response.data)
    }
    console.log(cart,'cart')

    return (
        <div style={{ margin: '20px' }}>
          <h1>{username}'s Cart</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {cart.map(({ id, orderId, breed_name, image_url, description, price, gender, quantity }) => (
              <div key={id} className="col">
                <Card style={{ height: '100%' }}>
                  <Card.Img variant="top" src={image_url} style={{ width: '200px', height: '250px' }} alt={breed_name} />
                  <Card.Body>
                    <Card.Title>{breed_name}</Card.Title>
                    <Card.Text className="small">{description}</Card.Text>
                    <Card.Text>Gender: {gender}</Card.Text>
                    <Card.Text>Price: ${parseFloat(price).toFixed(2)}</Card.Text>
                    <Card.Text>Quantity: {quantity}</Card.Text>
                    <DeleteProduct cart={cart} setCart={setCart} getCart={getCart} id={id} token={token} />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <h3>Order Total: ${cart.reduce((total, { price, quantity }) => total + parseFloat(price).toFixed(2) * quantity, 0).toFixed(2)}</h3>
            <CheckoutNavigation />
          </div>
        </div>
      )
};

export default Cart;

    // const animalInfo = [];
    // const animalData = JSON.parse(localStorage.getItem('animals'));
    // for (let i = 0; i < animalData.length; i++) {
    //     const mappedAnimalData = animalData[i];
    //     animalInfo.push(
    //         <form>
    //         <h2>Product</h2>
    //         <img src={mappedAnimalData.image_url}/> want image here
    //         <h3>{}</h3>
    //         <button>Remove Item</button>

    //         <h2>Quantity</h2>
    //         <h3>{mappedAnimalData.quantity}</h3>

    //         <h2>Each</h2>
    //         <h3>${mappedAnimalData.price}</h3>

    //         {/* Needs button for removing items, do in form or outside? */}

    //         <h2>Order Summary</h2>
    //         <h3>Subtotal: ${mappedAnimalData.price}</h3>
    //         <h3>Shipping Fee: ${}</h3>
    //         <h3>Total: ${}</h3>

    //         <CheckoutNavigation />
    //     </form>
    //     )
    //     console.log(mappedAnimalData);
    // }
    
    
    // const mappedAnimalData = animalData.map(animal => {
    //     console.log(animal);
    // })
    // console.log(animalData, 'this is animal data');
    // console.log(mappedAnimalData, 'this is map');