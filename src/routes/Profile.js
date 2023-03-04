import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

const Profile = () => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const [saleItems, setSaleItems] = useState([]);

    // useEffect(() => {
    //     try {
    //         // will need API.js set up in order to fetchAllSaleItems
    //         fetchAllSaleItemsByUser(username).then((results) => {
    //             setSaleItems(results);
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [username])

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>

            <h2>Order History</h2>

            <div>
                {
                    saleItems.length > 0 ?
                        saleItems.map(saleItem => {
                            return (
                                <ul key={saleItem.id}>
                                    <li>
                                        <h3>Order #{saleItem.id}</h3>
                                        <li>Ordered on {saleItems.sales_date}</li>
                                        <li>Product: {saleItem.breed_name}</li>
                                        <li>Description: {saleItem.description}</li>
                                        <li>Gender: {saleItem.gender}</li>
                                        <li>Quantity: {saleItem.quantity}</li>
                                    </li>
                                    <li>
                                        <h3>Order Summary</h3>
                                        <li>Subtotal: ${saleItem.total_item_amount}</li>
                                        <li>Shipping & Handling: {saleItem.shipping_fee}</li>
                                        <li>Grand Total: {saleItem.sales_total_amount}</li>
                                    </li>
                                    <li>
                                        <h3>Shipping Address</h3>
                                        <li>{saleItem.firstname} {saleItem.lastname}</li>
                                        <li>{saleItem.address}</li>
                                        <li>{saleItem.city}, {saleItem.state} {saleItem.zipcode}</li>
                                        <li>United States</li>
                                    </li>
                                    <li>{saleItem.image_url}</li>
                                </ul>
                            )
                        }) : null
                }
            </div>
        </div>
    )
};

export default Profile;