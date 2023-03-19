import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
// import { getCustomerCart } from '../api/API';
// import { useLocation } from "react-router-dom";

const Profile = () => {
    const token = localStorage.getItem('token');
    const { username, id } = jwt_decode(token);
    const [orderItems, setOrderItems] = useState([]);
    // const location = useLocation();
    // const [ customerId ] = useState(id);
    // const [lineItems, setLineItems] = useState(location.state.data);

    // useEffect(() => {
    //     try {
    //         getCustomerCart(token, customerId).then((results) => {
    //             setLineItems(results);
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [token, customerId])

    // console.log(lineItems, 'this orderitems');
    

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