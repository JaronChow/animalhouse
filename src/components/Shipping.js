import { useEffect, useState } from "react";
import CheckoutNavigation from "./CheckoutNavigation";

const Shipping = () => {
    const [formData, setFormData] = useState({
        option1: false,
        option2: false
    });

    // will need data from customer_sales shipping?
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    const handleCheckbox = (event) => {
        try {
            const { name, checked } = event.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked
            }));

        } catch (error) {
            console.error(error);
        }
    }

    // will need button to go back to previous page without refreshing browser
    // needs checkbox for inputs
    return (
        <div>
            <h1>Shipping Method</h1>

            <form>
                <label>
                    <input
                        type="checkbox"
                        name="option1"
                        checked={formData.option1}
                        onChange={handleCheckbox}
                    ></input>
                    Standard Shipping: 5 to 10 Business Days
                </label>
                
                <label>
                    <input
                        type="checkbox"
                        name="option2"
                        checked={formData.option2}
                        onChange={handleCheckbox}
                    ></input>
                    Premium Shipping: 2 to 3 Business Days
                </label>

                <CheckoutNavigation />
            </form>
        </div>
    )
}

export default Shipping;