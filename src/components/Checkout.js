import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createCheckoutInfo } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";

const Checkout = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [token] = useOutletContext();
    const [checkoutInfo, setCheckoutInfo] = useState([]);

    async function submitCheckoutInfo(event) {
        try {
            event.preventDefault();

            const checkoutInfo = {
                email,
                phone,
                firstName,
                lastName,
                address,
                city,
                state,
                zipcode
            }

            const response = await createCheckoutInfo(checkoutInfo, token);

            if (!firstName) {
                setErrorMsg("First name is required");
            } else if (!lastName) {
                setErrorMsg("Last name is required");
            } else if (!address) {
                setErrorMsg("Address is required");
            } else if (!city) {
                setErrorMsg("City is required");
            } else if (!state && state.length < 2 && state.length > 2) {
                setErrorMsg("State is required, state initials only");
            } else if (!zipcode && zipcode.length < 6 && zipcode.length > 6) {
                setErrorMsg("Valid zipcode is required");
            } else if (!phone && phone.length < 9 && phone.length > 9) {
                setErrorMsg("Valid phone number is required, do not include special characters or spaces"); 
            } else if (!email) {
                setErrorMsg("Email must be provided");
            } else {
                setCheckoutInfo([...checkoutInfo, response])
                setErrorMsg("");
                setFirstName("");
                setLastName("");
                setAddress("");
                setCity("");
                setState("");
                setZipcode("");
                setEmail("");
                setPhone("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Checkout</h1>

            <p>{errorMsg}</p>
            <form>
                <h2>Contact Information</h2>

                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    placeholder="Phone Number"
                    required
                ></input>

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    placeholder="Phone Number"
                    required
                ></input>

                <h2>Shipping Address</h2>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInput}
                    placeholder="First Name"
                    required
                ></input>

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInput}
                    placeholder="Last Name"
                    required
                ></input>

                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInput}
                    placeholder="Address"
                    required
                ></input>

                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInput}
                    placeholder="City"
                    required
                ></input>
                
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInput}
                    placeholder="State"
                    required
                ></input>

                <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInput}
                    placeholder="Zipcode"
                    required
                ></input>

                <CheckoutNavigation />
            </form>

        </div>
    )
}

export default Checkout;