import { useEffect, useState } from "react";

const Shipping = () => {
    const [shippingMethod, setShippingMethod] = useState("");

    // will need data from customer_sales shipping?
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    async function submitShipping(event) {
        try {
            event.preventDefault();

        } catch (error) {
            console.error(error);
        }
    }

    // will need button to go back to previous page without refreshing browser
    // needs checkbox for inputs
    return (
        <div>
            <h1>Shipping Method</h1>

            <form onSubmit={submitShipping}>
                <label>Standard Shipping: 5 to 10 Business Days</label>
                <input

                ></input>
                
                <label>Premium Shipping: 2 to 3 Business Days</label>
                <input
                
                ></input>

                <button type="submit">Continue to billing</button>
            </form>
        </div>
    )
}

export default Shipping;