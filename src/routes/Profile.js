import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// import { fetchAllOrderItems } from '../api/API';

const Profile = () => {
    const [token, setToken] = useOutletContext();
    const { username } = jwt_decode(token);
    const [OrderItems, setOrderItems] = useState([]);

    // useEffect(() => {
    //     try {
    //         // will need API.js set up in order to fetchAllOrderItems
    //         fetchAllOrderItems(token).then((results) => {
    //             setOrderItems(results);
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [token]);

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>

            <h2>Order History</h2>

            <div>
                {
                    OrderItems ?
                        OrderItems.map(OrderItem => {
                            return (
                                <ul key={OrderItem.id}>
                                    <li>
                                        <h3>Order #{OrderItem.id}</h3>
                                        <li>Ordered on {OrderItems.sales_date}</li>
                                        <li>Product: {OrderItem.breed_name}</li>
                                        <li>Description: {OrderItem.description}</li>
                                        <li>Gender: {OrderItem.gender}</li>
                                        <li>Quantity: {OrderItem.quantity}</li>
                                    </li>
                                    <li>
                                        <h3>Order Summary</h3>
                                        <li>Subtotal: ${OrderItem.total_item_amount}</li>
                                        <li>Shipping & Handling: {OrderItem.shipping_fee}</li>
                                        <li>Grand Total: {OrderItem.sales_total_amount}</li>
                                    </li>
                                    <li>
                                        <h3>Shipping Address</h3>
                                        <li>{OrderItem.firstname} {OrderItem.lastname}</li>
                                        <li>{OrderItem.address}</li>
                                        <li>{OrderItem.city}, {OrderItem.state} {OrderItem.zipcode}</li>
                                        <li>United States</li>
                                    </li>
                                    <li>{OrderItem.image_url}</li>
                                </ul>
                            )
                        }) : null
                }
            </div>
        </div>
    )
};

export default Profile;