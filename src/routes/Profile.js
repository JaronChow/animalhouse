import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getOrderItemsByCustomerId } from '../api/API';

const Profile = () => {
    const [token, setToken] = useOutletContext();
    const { username, id } = jwt_decode(token);
    const [orderItems, setOrderItems] = useState([]);
    console.log(username, 'this is username');
    console.log(id, 'this is id');

    useEffect(() => {
        try {
            // will need API.js set up in order to fetchAllOrderItems
            getOrderItemsByCustomerId(id, token).then((results) => {
                console.log(results, 'results');
                setOrderItems(results);
            })
        } catch (error) {
            console.error(error);
        }
    }, [id, token]);

    console.log(orderItems, 'this orderitems');
    

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>

            <h2>Order History</h2>

            <div>
                {
                    orderItems ?
                        orderItems.map(orderItem => {
                            return (
                                <ul key={orderItem.id}>
                                    <li>
                                        <h3>Order #{orderItem.id}</h3>
                                        <li>Ordered on {orderItem.sales_date}</li>
                                        <li>Product: {orderItem.breed_name}</li>
                                        <li>Description: {orderItem.description}</li>
                                        <li>Gender: {orderItem.gender}</li>
                                        <li>Quantity: {orderItem.quantity}</li>
                                    </li>
                                    <li>
                                        <h3>Order Summary</h3>
                                        <li>Subtotal: ${orderItem.total_item_amount}</li>
                                        <li>Shipping & Handling: {orderItem.shipping_fee}</li>
                                        <li>Grand Total: {orderItem.sales_total_amount}</li>
                                    </li>
                                    <li>
                                        <h3>Shipping Address</h3>
                                        <li>{orderItem.firstname} {orderItem.lastname}</li>
                                        <li>{orderItem.address}</li>
                                        <li>{orderItem.city}, {orderItem.state} {orderItem.zipcode}</li>
                                        <li>United States</li>
                                    </li>
                                    <li>{orderItem.image_url}</li>
                                </ul>
                            )
                        }) : null
                }
            </div>
        </div>
    )
};

export default Profile;