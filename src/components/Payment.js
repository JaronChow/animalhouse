import { useState } from "react";
import CheckoutNavigation from "./CheckoutNavigation";

const Payment = () => {
    const [formData, setFormData] = useState({
        cardNum: "",
        cardOwner: "",
        expiration: "",
        securityCode: ""
    });
    const [errorMsg, setErrorMsg] = useState("")

    // might need to add formData in the beginning
    const handleInput = (event) => {
        try {
            const { name, value } = event.target;
            if (!cardNum && cardNum.length < 16) {
                setErrorMsg("Card number must be provided");
            } else if (!cardOwner) {
                setErrorMsg("Must input full name on card");
            } else if (!expiration) {
                // might need a way to check if card has not passed expiration
                setErrorMsg("Expiration date must be provided");
            } else if (!securityCode && securityCode.length < 3 && securityCode.length > 3) {
                setErrorMsg("Must input valid security code") 
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            }

        } catch (error) {
            console.error(error);
        }
    }

    // will need button to go back to previous page without refreshing browser
    // will need parameters for expiration and security code types
    return (
        <div>
            <h1>Payment</h1>

            <p>{errorMsg}</p>

            <form>
                <input
                    type="text"
                    name="cardName"
                    value={formData.cardNum}
                    onChange={handleInput}
                    placeholder="Card Number"
                    required
                ></input>

                <input
                    type="text"
                    name="cardOwner"
                    value={formData.cardOwner}
                    onChange={handleInput}
                    placeholder="Name On Card"
                    required
                ></input>

                <input
                    type=""
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleInput}
                    placeholder="Expiration Date"
                    required
                ></input>

                <input
                    type=""
                    name="securityCode"
                    value={formData.securityCode}
                    onChange={handleInput}
                    placeholder="Security Code"
                    required
                ></input>

                <CheckoutNavigation />
            </form>
        </div>
    )
}

export default Payment;