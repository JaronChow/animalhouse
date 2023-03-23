import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { fetchUserById } from "../api/API";
import jwt_decode from "jwt-decode";

const Profile = () => {
    const { token } = useOutletContext();
    const { username, id } = jwt_decode(token);
    const [accountInfo, setAccountInfo] = useState({});
    const { firstname, lastname, phone_number, email_address, address, city, state, zipcode } = accountInfo;
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getUser();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getUser = async () => {
        const response = await fetchUserById(id, token);
        setAccountInfo(response);
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className='mt-4' style={{ fontSize: '30px' }}>Welcome {username}!</h1>
            <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3">
                        <Card.Body>
                            <Card.Title>Profile Information</Card.Title>
                            <Card.Text>First Name: {firstname}</Card.Text>
                            <Card.Text>Last Name: {lastname}</Card.Text>
                            <Card.Text>Phone Number: {phone_number}</Card.Text>
                            <Card.Text>Email: {email_address}</Card.Text>
                            <Card.Text>Address: {address}</Card.Text>
                            <Card.Text>City: {city}</Card.Text>
                            <Card.Text>State: {state}</Card.Text>
                            <Card.Text>Zipcode: {zipcode}</Card.Text>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor: 'white', border: 'none' }} className="d-flex flex-wrap justify-content-center">
                            <Button className="me-3" onClick={(e) => navigate(`/editProfile`, { state: { firstname, lastname, phone_number, email_address, address, city, state, zipcode }})} variant="outline-secondary">Edit Profile</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </div>
    )
};

export default Profile;