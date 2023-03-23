import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { editUser } from "../api/API";
import { Container, Button, Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";

const EditProfile = () => {
    const { token } = useOutletContext();
    const { state } = useLocation();
    const { username, id } = jwt_decode(token);
    const [thisUser, setThisUser] = useState({...state});
    const [editFirstname, setEditFirstname] = useState(thisUser.firstname);
    const [editLastname, setEditLastname] = useState(thisUser.lastname);
    const [editPhone, setEditPhone] = useState(thisUser.phone_number);
    const [editEmail, setEditEmail] = useState(thisUser.email_address);
    const [editAddress, setEditAddress] = useState(thisUser.address);
    const [editCity, setEditCity] = useState(thisUser.city);
    const [editState, setEditState] = useState(thisUser.state);
    const [editZipcode, setEditZipcode] = useState(thisUser.zipcode);
    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const user = {
            firstname: editFirstname,
            lastname: editLastname,
            username,
            phone_number: editPhone,
            email_address: editEmail,
            address: editAddress,
            city: editCity,
            state: editState,
            zipcode: editZipcode
        }
    
        const response = await editUser(user, id, token);
        console.log(response,' this is other response');
        
        setThisUser(response.data);
        navigate('/profile')
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>Edit {username}'s Profile</h3>
            <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '1400px',  width: '18rem' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    <Form onSubmit={edit} className="mt-2">
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisUser.firstname}
                                    placeholder="First Name"
                                    onChange={(e) => setEditFirstname(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisUser.lastname}
                                    placeholder="Last Name"
                                    onChange={(e) => setEditLastname(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                    type="number"
                                    minLength={10}
                                    maxLength={10}
                                    defaultValue={thisUser.phone_number}
                                    placeholder="Phone Number"
                                    onChange={(e) => setEditPhone(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text"
                                    defaultValue={thisUser.email_address}
                                    placeholder="Email"
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    type="text"
                                    defaultValue={thisUser.address}
                                    placeholder="Address"
                                    onChange={(e) => setEditAddress(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisUser.city}
                                    placeholder="City"
                                    onChange={(e) => setEditCity(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisUser.state}
                                    minLength={2}
                                    maxLength={2}
                                    placeholder="State"
                                    onChange={(e) => setEditState(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Zipcode</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    defaultValue={thisUser.zipcode}
                                    minLength={5}
                                    maxLength={5}
                                    placeholder="Zipcode"
                                    onChange={(e) => setEditZipcode(e.target.value)}
                                />
                        </Form.Group>
                        <Button type="submit" className="mb-3" style={{ width: '20rem' }} variant="primary">Edit</Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default EditProfile;