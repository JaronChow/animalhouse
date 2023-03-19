import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
                        <Button onClick={handleNext} variant="primary">Continue To Checkout</Button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/checkout' ? <Link to='/shoppingCart' state={{ data: lineItems.data }}>
                        <Button onClick={handleBack} variant="secondary">Go Back To Cart</Button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/orderSummary' ? <Link to='/checkout' state={{ data: lineItems.data }}>
                        <Button onClick={handleBack} variant="secondary">Go Back To Checkout</Button>
                    </Link> : null}
                 </div>
            </ul>
        </div>
    )
}

export default CheckoutNavigation;