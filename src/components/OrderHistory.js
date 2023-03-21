import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getOrderHistory, getShippingInfo } from '../api/API';
import { Card, Button } from "react-bootstrap";

const Profile = () => {
    const { token } = useOutletContext();
    const { username, id } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [ customerOrders, setCustomerOrders] = useState([]);
    const [ shippingInfo, setShippingInfo ] = useState([]);

    useEffect(() => {
        try {
            orderHistory(),
            getShipping();
        } catch (error) {
            console.error(error);
        }
    }, [token, customerId])

    const orderHistory = async () => {
        const response = await getOrderHistory (token, customerId);
        console.log(response.data, '')
        setCustomerOrders(Object.values(response.data));
    }
    console.log(customerOrders, 'orders')
    const getShipping = async() => {
        const response = await getShippingInfo(customerId, token);
        setShippingInfo(response.data);
      } 

    return(
        <div style={{ margin: '20px' }}>
            <h1>Welcome {username}!</h1>

            <h2>Order History</h2>

            <div className="row">
            {customerOrders.forEach(order => {order.map(({id, animalId, orderId, breed_name, image_url, description, price}) => (
                    <div key={id} className="col">
                    <Card style={{ height: '100%' }}>
                        <Card.Img variant="top" src={image_url} style={{ width: '200px', height: '250px' }} alt={breed_name} />
                        <Card.Body>
                        <Card.Title>{breed_name}</Card.Title>
                        <Card.Text className="small">{description}</Card.Text>
                        <Card.Text>Price: ${parseFloat(price).toFixed(2)}</Card.Text>
                        <Card.Text>Quantity: </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                ))
            })}
            </div>
        </div>
        );
};

export default Profile;