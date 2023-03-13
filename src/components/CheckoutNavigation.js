import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { fetchUserById } from "../api/API";
import jwt_decode from 'jwt-decode';

const CheckoutNavigation = () => {
    const [step, setStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState([]);
    const location = useLocation();
    const [token] = useOutletContext();
    const { id } = jwt_decode(token);

    async function testFetch(id, token) {
        const response = await fetchUserById(id, token);
        console.log(response, 'this is response');
    }

    testFetch(id, token);

    useEffect(() => {
        try {
            fetchUserById(id, token).then((results) => {
                // console.log(results, 'results from navigation');
                setCustomerInfo(results);
            })
        } catch (error) {
            console.error(error);
        }
    }, [id, token]);

    const handleNext = () => {
        setStep(step => step + 1);
    };

    const handleBack = () => {
        setStep(step => step - 1);
    };

    return (
        <div>
            <ul>
                 <div>
                    {location.pathname === '/shoppingCart' ? <Link to='/checkout'>
                        <button onClick={handleNext}>Continue To Checkout</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/checkout' ? <Link to='/shoppingCart'>
                        <button onClick={handleBack}>Go Back To Cart</button>
                    </Link> : null}
                    {location.pathname === '/checkout' ? <Link to='/shipping'>
                        <button onClick={handleNext}>Continue To Shipping</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/shipping' ? <Link to='/checkout'>
                        <button onClick={handleBack}>Go Back To Checkout</button>
                    </Link> : null}
                    {location.pathname === '/shipping' ? <Link to='/stripe'>
                        <button onClick={handleNext}>Continue To Payment</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/stripe' ? <Link to='/shipping'>
                        <button onClick={handleBack}>Go Back To Shipping</button>
                    </Link> : null}
                 </div>
            </ul>
        </div>
    )
}

export default CheckoutNavigation;