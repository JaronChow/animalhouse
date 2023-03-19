import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { getCustomerCart, getShippingInfo } from '../api/API';

const Profile = () => {
    const token = localStorage.getItem('token');
    const { username, id } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [lineItems, setLineItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState([]);

    useEffect(() => {
        try {
            getCustomerCart(token, customerId).then((results) => {
                setLineItems(results.data);
            });
            getShipping();
        } catch (error) {
            console.error(error);
        }
    }, [token, customerId])

    console.log(lineItems, 'this lineItems in profile');

    const getShipping = async() => {
        const response = await getShippingInfo(customerId, token);
        console.log(response, 'this response');
        setShippingInfo(response.data);
      } 
      console.log(shippingInfo, 'this is shipping info');
    

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>

            <h2>Order History</h2>

            <div>
                {
                    lineItems.length > 0 ?
                        lineItems.map(lineItem => {
                            return (
                                <ul key={lineItem.id}>
                                    <h3>Order Summary</h3>
                                    <ul>
                                        <li>Order #{lineItem.id}</li>
                                        <li>Ordered on {lineItem.sales_date}</li>
                                        <li>{lineItem.breed_name}</li>
                                        <li>Product Details: {lineItem.description}</li>
                                        <li><img src={lineItem.image_url}/></li>
                                        <li>Gender: {}</li>
                                        <li>Qty: {lineItem.quantity}</li>
                                    </ul>
                                    <ul>
                                        <li>Subtotal: ${}</li>
                                        <li>Shipping & Handling: {}</li>
                                        <li>Grand Total: {}</li>
                                    </ul>
                                    <h3>Shipping Address</h3>
                                    <ul>
                                        <li>{shippingInfo.address}</li>
                                        <li>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipcode}</li>
                                        <li>United States</li>
                                    </ul>
                                </ul>
                            )
                        }) : null
                }
            </div>
        </div>
    )
};

export default Profile;