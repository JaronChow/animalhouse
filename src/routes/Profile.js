import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchUserById, editUser, fetchAllUsers } from '../api/API';
import { Container, Table, Button, Stack, Form } from "react-bootstrap";

const Profile = () => {
    const { token } = useOutletContext();
    const { username, id } = jwt_decode(token);
    const [accountInfo, setAccountInfo] = useState({});
    const { firstname, lastname, phone_number, email_address, address, city, state, zipcode } = accountInfo;
    const [editFirstname, setEditFirstname] = useState(firstname);
    const [editLastname, setEditLastname] = useState(lastname);
    const [editPhone, setEditPhone] = useState(phone_number);
    const [editEmail, setEditEmail] = useState(email_address);
    const [editAddress, setEditAddress] = useState(address);
    const [editCity, setEditCity] = useState(city);
    const [editState, setEditState] = useState(state);
    const [editZipcode, setEditZipcode] = useState(zipcode);
    const [isEdited, setIsEdited] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');



    useEffect(() => {
        try {
            getUser();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getUser = async () => {
        const response = await fetchUserById(id, token);
        console.log(response, 'this is response');
        setAccountInfo(response);
    }

    async function onClickEdit(event, id) {
        event.preventDefault();

        if (isEdited === true) {
            setIsEdited(false)
        } else {
            setIsEdited(true)
        }
    }

    async function edit(event) {
        event.preventDefault();

        const allUsers = await fetchAllUsers();
    
        const userWithEmail = allUsers.find(user => user.email_address === email_address);
    
        if (userWithEmail) {
            setEmailError('Email already exists, please enter another email.')
        } else if (!firstname) {
            setErrorMessage('First name is required, or leave default.')
        } else if (!lastname) {
            setErrorMessage('Last name is required, or leave default.')
        } else if (!email_address) {
            setErrorMessage('Email is required, or leave default.')
        } else if (!address) {
            setErrorMessage('Address is required, or leave default.')
        } else if (!city) {
            setErrorMessage('City is required, or leave default')
        } else {
            const user = {
                id,
                username,
                firstname: editFirstname,
                lastname: editLastname,
                phone_number: editPhone,
                email_address: editEmail,
                address: editAddress,
                city: editCity,
                state: editState,
                zipcode: editZipcode
            }
    
            const response = await editUser(user, id, token);
    
            console.log(response,' this is other response');
            
            setAccountInfo(response.data);
            setIsEdited(false);
        }
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-4">Welcome {username}</h1>
            <h3 className="mt-4">Account Information</h3>
            <Container className="mt-3 d-flex justify-content-center" style={{ maxWidth: '1200px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{username}</td>
                            <td>{firstname} {lastname}</td>
                            <td>{phone_number}</td>
                            <td>{email_address}</td>
                            <td>{address} {city}, {state} {zipcode}</td>
                        </tr>
                    </tbody>
                </Table> 
            </Container>
            <Button className="col-md-5" onClick={(event) => onClickEdit(event, id)} variant="outline-secondary">Update User Information</Button>
            {
                isEdited === true ?
                <Form onSubmit={(event) => edit(event, id)}>
                    <Stack direction="horizontal" gap={2} className="mt-2 justify-content-center">
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={firstname}
                                onChange={
                                    (event) => setEditFirstname(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={lastname}
                                onChange={
                                    (event) => setEditLastname(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={phone_number}
                                minLength={10}
                                maxLength={10} 
                                onChange={
                                    (event) => setEditPhone(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={email_address}
                                onChange={
                                    (event) => setEditEmail(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={address}
                                onChange={
                                    (event) => setEditAddress(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={city}
                                onChange={
                                    (event) => setEditCity(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={state}
                                maxLength={2}
                                minLength={2}
                                onChange={
                                    (event) => setEditState(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control 
                                className='w-50'
                                type='text'
                                defaultValue={zipcode}
                                minLength={5}
                                maxLength={5}
                                onChange={
                                    (event) => setEditZipcode(event.target.value)
                                }
                            />
                        </Form.Group>
                        <p className="text-danger">{emailError}</p>
                        <p className="text-danger">{errorMessage}</p>
                        <Button className="mt-4" variant="outline-secondary" style={{ maxWidth: '200px' }} type="submit">Edit</Button>
                    </Stack>
                </Form> : null
            }
        </div>
    );
};

export default Profile;