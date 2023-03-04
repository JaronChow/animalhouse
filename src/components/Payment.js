import { useState } from "react";

const Payment = () => {
    const [cardNum, setCardNum] = useState("");
    const [cardOwner, setCardOwner] = useState("");
    const [expiration, setExpiration] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("")

    async function submitPayment(event) {
        try {
            event.preventDefault();

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
                setErrorMsg("");
                setCardNum("");
                setCardOwner("");
                setExpiration("");
                setSecurityCode("");
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

            <form onSubmit={submitPayment}>
                <label>Card Number</label>
                <input
                    type="text"
                    value={cardNum}
                    onChange={(event) => setCardNum(event.target.value)}
                ></input>

                <label>Name On Card</label>
                <input
                    type="text"
                    value={cardOwner}
                    onChange={(event) => setCardOwner(event.target.value)}
                ></input>

                <label>Expiration Date</label>
                <input
                    type=""
                    value={expiration}
                    onChange={(event) => setExpiration(event.target.value)}
                ></input>

                <label>Security Code</label>
                <input
                    type=""
                    value={securityCode}
                    onChange={(event) => setSecurityCode(event.target.value)}
                ></input>

                <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Payment;