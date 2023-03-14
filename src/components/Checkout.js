import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { createCheckoutInfo, fetchUserById } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";

const Checkout = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [usaState, setUsaState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [token] = useOutletContext();
    const [checkoutInfo, setCheckoutInfo] = useState([]);
    const { state } = useLocation();
 
    console.log(state, 'this is state in shoppingcart');

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
            } else if (!usaState && usaState.length < 2 && usaState.length > 2) {
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
                setUsaState("");
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

            <form onSubmit={submitCheckoutInfo}>
                <h2>Contact Information</h2>

                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                    required
                ></input>

                <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone Number"
                    required
                ></input>

                <h2>Shipping Address</h2>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First Name"
                    required
                ></input>

                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last Name"
                    required
                ></input>

                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Address"
                    required
                ></input>

                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="City"
                    required
                ></input>
                
                <input
                    type="text"
                    name="state"
                    value={usaState}
                    onChange={(event) => setUsaState(event.target.value)}
                    placeholder="State"
                    required
                ></input>

                <input
                    type="number"
                    name="zipcode"
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                    placeholder="Zipcode"
                    required
                ></input>

                <CheckoutNavigation />
            </form>
        </div>
    )
}

export default Checkout;