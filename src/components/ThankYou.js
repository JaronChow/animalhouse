import { useEffect } from "react";
import CheckoutNavigation from "./CheckoutNavigation";

const ThankYou = () => {

    // might need useEffect for getting all the info from this order
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    return (
        <div>
            <h1>Thank you for your order!</h1>
            <CheckoutNavigation />
        </div>
    )
}

export default ThankYou;