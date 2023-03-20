import { useEffect } from "react";

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
        </div>
    )
}

export default ThankYou;