import { useEffect, useState } from "react";
import CheckoutNavigation from "./CheckoutNavigation";

const Checkout = () => {
    const [customerInfo, setCustomerInfo] = useState({});

    // will need data from customers
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    // might or might not need depending on update possibly?
    const handleInput = (event) => {
        try {
            event.preventDefault();

        } catch (error) {
            console.error(error);
        }
    } 

    // will need button to go back to previous page without refreshing browser
    // will also need functionality to change any of this info, in case they want to
    return (
        <div>
            <h1>Checkout</h1>

            <form>
                {
                    customerInfo.length > 0 ?
                        customerInfo.map(info => {
                            return (
                                <ul key={info.id}>
                                    <li>
                                        <h2>Contact Information</h2>
                                        <li>Email Address: {info.email_address}</li>
                                        <li>Phone Number: {info.phone_number}</li>
                                    </li>
                                    <li>
                                        <h2>Shipping Address</h2>
                                        <li>First Name: {info.firstname}</li>
                                        <li>Last Name: {info.lastname}</li>
                                        <li>Address: {info.address}</li>
                                        <li>City: {info.city}</li>
                                        <li>State: {info.state}</li>
                                        <li>Zipcode: {info.zipcode}</li>
                                    </li>
                                </ul>
                            )
                        }) : null
                }

                <CheckoutNavigation />
            </form>

        </div>
    )
}

export default Checkout;