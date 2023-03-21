import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer, fetchAllUsers } from '../api/API';
import { Button, Modal } from 'react-bootstrap'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

const RegisterCustomer = () => {
    const [firstname, setFirstname] = useState ('');
    const [lastname, setLastname] = useState ('');
    const [phone_number, setPhoneNumber] = useState ('');
    const [email_address, setEmailAddress] = useState ('');
    const [address, setAddress] = useState ('');
    const [city, setCity] = useState ('');
    const [state, setState] = useState ('');
    const [zipcode, setZipcode] = useState ('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Create Username and Password');
    const navigate = useNavigate();

    async function registered () {
        setIsOpen(false)
        navigate('/login');
    }

    async function submitCustomerForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Username required");
        }else if (password.length < 8){
            setErrorMessage("Password needs to be a minimum of 8 characters.");

        }else if (password !== confirmPassword){
            setErrorMessage("Passwords must match");
        }else {
            const allUsers = await fetchAllUsers();
        
            const userWithEmail = allUsers.find(user => user.email_address === email_address);
            const userWithUsername = allUsers.find(user => user.username === username);
        
            if (userWithEmail) {
              setEmailError('Email already exists, please enter another email.')
            } else if (userWithUsername) {
              setUsernameError('Username already exists, please enter another username.')
            } else {
                const user = { role:"customer", firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode };
                const response = await registerCustomer(user);
                console.log(response)
                setIsOpen(true)
                setEmailAddress('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            }
        }
    }

    return (
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol className="col-md-5">
              <MDBCard>
                <MDBCardBody>
                    <h2 className="text-center mt-1" style ={{ fontSize: '30px'}}>Registration</h2>
                    <form onSubmit={submitCustomerForm}>
                        <MDBRow className="g-3 mt-1 mb-3">
                            <MDBCol md='6'>
                                <MDBInput
                                    label="First Name"
                                    type="text"
                                    value={firstname}
                                    onChange={event => setFirstname(event.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='6'>
                                <MDBInput
                                    label="Last Name"
                                    type="text"
                                    value={lastname}
                                    onChange={event => setLastname(event.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBInput
                            label="Phone Number"
                            type="text"
                            className="mt-3"
                            value={phone_number}
                            maxLength={10} 
                            onChange={event => setPhoneNumber(event.target.value)}
                        />
                        <MDBInput
                            label="Email Address"
                            type="text"
                            className="mt-3"
                            value={email_address}
                            onChange={event => setEmailAddress(event.target.value)}
                        />
                        <p className="text-danger">{emailError}</p>
                        <MDBInput
                            label="Address"
                            type="text"
                            className="mt-3"
                            value={address}
                            onChange={event => setAddress(event.target.value)}
                        />
                        <MDBRow className="g-3 mt-1 mb-3">
                            <MDBCol md='5'>
                                <MDBInput
                                    label="City"
                                    type="text"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput
                                    label="State"
                                    type="text"
                                    maxLength={2}
                                    value={state}
                                    onChange={event => setState(event.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    label="Zipcode"
                                    type="text"
                                    value={zipcode}
                                    onChange={event => setZipcode(event.target.value.toUpperCase())}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBInput
                            label="Username"
                            type="username"
                            className="mt-3"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <p className="text-danger">{usernameError}</p>
                        <MDBInput
                            label="Password"
                            type="password"
                            className="mt-3"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <MDBInput
                            label="Confirm Password"
                            type="password"
                            className="mt-3"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                        <p className="text-danger">{errorMessage}</p>
                        <MDBBtn 
                            type="submit" 
                            className="d-flex justify-content-end text-center mt-3"
                            onChange={event => event.target.value}
                            >Register
                        </MDBBtn>
                        <Modal
                            show={isOpen}
                            onHide={() => setIsOpen(false)}
                            style={{
                                overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                content: {
                                border: 'none',
                                borderRadius: '5px',
                                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                                }
                            }}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title>Registration Successful</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><p>Thanks for signing up!</p></Modal.Body>
                            <Modal.Footer>
                                <Button onClick={registered} variant="primary">Go To Login</Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol> 
        </MDBRow>
    </MDBContainer>
    )
};

export default RegisterCustomer;