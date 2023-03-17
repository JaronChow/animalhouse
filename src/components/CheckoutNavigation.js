import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { getCustomerCart } from "../api/API";
import jwt_decode from 'jwt-decode';

const CheckoutNavigation = () => {
    const [step, setStep] = useState(1);
    const token = localStorage.getItem('token');
    const { id } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [lineItems, setLineItems] = useState([]);

    useEffect(() => {
        try {
            getCustomerCart(token, customerId).then((results) => {
                // console.log(results, 'this is results');
                setLineItems(results);
            })
        } catch (error) {
            console.error(error);
        }
    }, [token, customerId])
    console.log(lineItems.data, 'this is line items 2');

    const handleNext = () => {
        setStep(step => step + 1);
    };

    const handleBack = () => {
        setStep(step => step - 1);
    };

    // From Cart to Checkout, need to save the cart items. 
    // From Checkout to OrderSummary, need to save the contact info and shipping address.
    // On Order Summary, be able to display the cart items (with prices, quantity, and sales info),
    // contact info, shipping address

    return (
        <div>
            <ul>
                 <div>
                    {location.pathname === '/shoppingCart' ? <Link to='/checkout' state={{ data: lineItems.data }}>
                        <button onClick={handleNext}>Continue To Checkout</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/checkout' ? <Link to='/shoppingCart'>
                        <button onClick={handleBack}>Go Back To Cart</button>
                    </Link> : null}
                    {location.pathname === '/checkout' ? <Link to='/orderSummary' state={{ data: lineItems, setData: setLineItems }}>
                        <button onClick={handleNext}>Continue To Order Summary</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/orderSummary' ? <Link to='/checkout'>
                        <button onClick={handleBack}>Go Back To Checkout</button>
                    </Link> : null}
                 </div>
            </ul>
        </div>
    )
}

export default CheckoutNavigation;