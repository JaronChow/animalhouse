import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { createCheckoutInfo } from "../api/API";
import jwt_decode from "jwt-decode";
import CheckoutNavigation from "./CheckoutNavigation";
import { Form, Button } from "react-bootstrap";
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';


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
    const { token } = useOutletContext();
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
        <MDBContainer style={{margin: '40px auto 0px' }}>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol className="col-md-5">
                    <MDBCard>
                        <MDBCardBody>
                            <h2 className="text-center mt-1" style ={{ fontSize: '30px'}}>Checkout</h2>
                            <p>{errorMsg}</p>
                            <Form onSubmit={submitCheckoutInfo}>
                                <MDBInput
                                    label="Address"
                                    type="text"
                                    className="mt-3"
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                    required
                                />
                                <MDBInput
                                    label="City"
                                    type="text"
                                    className="mt-3"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                    required
                                />
                                <MDBRow className="g-3 mt-1 mb-3">
                                    <MDBCol md='4'>
                                        <MDBInput
                                            label="State"
                                            type="text"
                                            maxLength={2}
                                            value={state}
                                            onChange={event => setState(event.target.value.toUpperCase())}
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol md='8'>
                                        <MDBInput
                                            label="Zipcode"
                                            type="text"
                                            maxLength={5}
                                            value={zipcode}
                                            onChange={event => setZipcode(event.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="my-4">
                                    <MDBCol>
                                        <CheckoutNavigation />
                                    </MDBCol>
                                    <MDBCol className="mx-4">
                                        <Button type='submit' variant="primary" state={{ data: lineItems }}>Continue to Order Summary</Button>
                                    </MDBCol>
                                </MDBRow>
                            </Form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol> 
            </MDBRow>
        </MDBContainer>
    )
}

export default Checkout;