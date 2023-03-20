import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext, useNavigate} from 'react-router-dom';
import { getCustomerCart } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";
import DeleteProduct from "./DeleteProduct";
import { Card, Button } from "react-bootstrap";

const Cart = () => {
  const { token } = useOutletContext();
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [cart, setCart] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() =>{
        getCart()
    }, [token, customerId]);

    const getCart = async () =>{
        const response = await getCustomerCart(token,customerId);
        setCart(response.data);
        setIsLoading(false);
    }

    return (
        <div style={{ margin: '20px' }}>
          <h1>{username}'s Cart</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
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
              <div className="mt-3">
                <h3>Order Total: ${cart.reduce((total, { price, quantity }) => total + parseFloat(price).toFixed(2) * quantity, 0).toFixed(2)}</h3>
                <CheckoutNavigation />
              </div>
            </div>
          )}
        </div>
      )
};

export default Cart;
