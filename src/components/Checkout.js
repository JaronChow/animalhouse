import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCheckoutInfo } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";


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
    const token = localStorage.getItem('token');
    const customerInfo = jwt_decode(token);
    const [ customerId ] = useState(customerInfo.id);
    const location = useLocation();
    const [checkoutInfo, setCheckoutInfo] = useState([]);
    const [lineItems, setLineItems] = useState(location.state.data);
    const navigate = useNavigate();

    // console.log(lineItems, ' this is line items from checkout');
    // console.log(location, 'this is location');
    // console.log(customerId,'this id');

    async function submitCheckoutInfo(event) {
        try {
            event.preventDefault();

            const checkoutInfo = {
                customerId,
                address,
                city,
                state,
                zipcode
            }

            const response = await createCheckoutInfo(checkoutInfo, token);
            console.log(response, 'response');

            setCheckoutInfo(response.data)
            lineItems.push(checkoutInfo);
            console.log(lineItems, 'this is lineitems with new checkout info');
            setErrorMsg("");
            setFirstName("");
            setLastName("");
            setAddress("");
            setCity("");
            setState("");
            setZipcode("");
            navigate('/orderSummary')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Checkout</h1>

            <p>{errorMsg}</p>

            <form onSubmit={submitCheckoutInfo}>
                <h2>Shipping Address</h2>

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
                    value={state}
                    maxLength={2}
                    onChange={(event) => setState(event.target.value.toUpperCase())}
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
                <Button type='submit' state={{ data: lineItems }}>Continue to Order Summary</Button>
            </form>
        </div>
    )
}

export default Checkout;