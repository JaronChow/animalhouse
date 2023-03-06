import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CheckoutNavigation = () => {
    const [step, setStep] = useState(1);
    const location = useLocation();

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
                        <button onClick={handleNext}>Continue to checkout</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/checkout' ? <Link to='/shoppingCart'>
                        <button onClick={handleBack}>Go back to cart</button>
                    </Link> : null}
                    {location.pathname === '/checkout' ? <Link to='/shipping'>
                        <button onClick={handleNext}>Continue to shipping</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/shipping' ? <Link to='/checkout'>
                        <button onClick={handleBack}>Go back to checkout</button>
                    </Link> : null}
                    {location.pathname === '/shipping' ? <Link to='/billing'>
                        <button onClick={handleNext}>Continue to billing</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/billing' ? <Link to='/shipping'>
                        <button onClick={handleBack}>Go back to shipping</button>
                    </Link> : null}
                    {location.pathname === '/billing' ? <Link to='/payment'>
                        <button onClick={handleNext}>Continue to payment</button>
                    </Link> : null}
                 </div>
                 <div>
                    {location.pathname === '/payment' ? <Link to='/billing'>
                        <button onClick={handleBack}>Go back to billing</button>
                    </Link> : null}
                    {location.pathname === '/payment' ? <Link to='/thankYouPage'>
                        <button onClick={handleNext}>Pay now</button>
                    </Link> : null}
                 </div>
            </ul>
        </div>
    )
}

export default CheckoutNavigation;