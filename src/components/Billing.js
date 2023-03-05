import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        phone: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    // might need to add formData in the beginning
    const handleInput = (event) => {
        try {
            const { name, value } = event.target;
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
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleNext = () => {
        try {
            axios
                .post("/billing", formData)
                .then((response) => {
                    navigate("/shipping");
                })
        } catch (error) {
            console.error(error);
        }
    }

    // will need button to go back to previous page without refreshing browser
    return (
        <div>
            <h1>Billing Address</h1>

            <p>{errorMsg}</p>

            <form>
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

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    placeholder="Phone Number"
                    required
                ></input>

                <button onClick={() => navigate(-1)}>Go back to shipping</button>
                <button onClick={handleNext}>Continue to payment</button>
            </form>
        </div>
    )
}

export default Billing;