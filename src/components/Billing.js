import { useState } from "react";

const Billing = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function submitBilling(event) {
        try {
            event.preventDefault();

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
            } else {
                setErrorMsg("");
                setFirstName("");
                setLastName("");
                setAddress("");
                setCity("");
                setState("");
                setZipcode("");
                setPhone("");
            }

        } catch (error) {
            console.error(error);
        }
    }

    // will need button to go back to previous page without refreshing browser
    return (
        <div>
            <h1>Billing Address</h1>

            <p>{errorMsg}</p>

            <form onSubmit={submitBilling}>
                <label>First Name: </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                ></input>

                <label>Last Name: </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                ></input>

                <label>Address: </label>
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                ></input>

                <label>City: </label>
                <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                ></input>
                
                <label>State: </label>
                <input
                    type="text"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                ></input>

                <label>ZIP Code: </label>
                <input
                    type="text"
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                ></input>

                <label>Phone Number: </label>
                <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                ></input>

                <button type="submit">Continue to payment</button>
            </form>
        </div>
    )
}

export default Billing;