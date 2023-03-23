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
        console.log(response, 'this is response');
        setAccountInfo(response);
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome {username}!</h1>
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

//     const { token } = useOutletContext();
//     const { username, id } = jwt_decode(token);
//     const [accountInfo, setAccountInfo] = useState({});
//     const { firstname, lastname, phone_number, email_address, address, city, state, zipcode } = accountInfo;
//     const [editFirstname, setEditFirstname] = useState(firstname);
//     const [editLastname, setEditLastname] = useState(lastname);
//     const [editPhone, setEditPhone] = useState(phone_number);
//     const [editEmail, setEditEmail] = useState(email_address);
//     const [editAddress, setEditAddress] = useState(address);
//     const [editCity, setEditCity] = useState(city);
//     const [editState, setEditState] = useState(state);
//     const [editZipcode, setEditZipcode] = useState(zipcode);
//     const [isEdited, setIsEdited] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [emailError, setEmailError] = useState('');

//     useEffect(() => {
//         try {
//             getUser();
//         } catch (error) {
//             console.error(error);
//         }
//     }, []);

//     const getUser = async () => {
//         const response = await fetchUserById(id, token);
//         console.log(response, 'this is response');
//         setAccountInfo(response);
//     }

//     async function onClickEdit(event, id) {
//         event.preventDefault();

//         if (isEdited === true) {
//             setIsEdited(false)
//         } else {
//             setIsEdited(true)
//         }
//     }

//     async function edit(event) {
//         event.preventDefault();

//         const allUsers = await fetchAllUsers();
    
//         const userWithEmail = allUsers.find(user => user.email_address === editEmail);
    
//         if (userWithEmail) {
//             setEmailError('Email already exists, please enter another email.')
//         } else if (!firstname) {
//             setErrorMessage('First name is required, or leave default.')
//         } else if (!lastname) {
//             setErrorMessage('Last name is required, or leave default.')
//         } else if (!email_address) {
//             setErrorMessage('Email is required, or leave default.')
//         } else if (!address) {
//             setErrorMessage('Address is required, or leave default.')
//         } else if (!city) {
//             setErrorMessage('City is required, or leave default')
//         } else {
//             const user = {
//                 username,
//                 firstname: editFirstname !== firstname ? editFirstname : firstname,
//                 lastname: editLastname !== lastname ? editLastname : lastname,
//                 phone_number: editPhone !== phone_number ? editPhone : phone_number,
//                 email_address: editEmail !== email_address ? editEmail : email_address,
//                 address: editAddress !== address ? editAddress : address,
//                 city: editCity !== city ? editCity : city,
//                 state: editState !== state ? editState : state,
//                 zipcode: editZipcode !== zipcode ? editZipcode : zipcode 
//             }
    
//             const response = await editUser(user, id, token);
    
//             console.log(response,' this is other response');
            
//             setAccountInfo(prevState => ({ ...prevState, ...response.data }));
//             setIsEdited(false);
//         }
//     }

//     return(
//         <div className="d-flex flex-column align-items-center justify-content-center">
//             <h1 className="mt-4">Welcome {username}</h1>
//             <h3 className="mt-4">Account Information</h3>
//             <Container className="mt-3 d-flex justify-content-center" style={{ maxWidth: '1200px' }}>
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Username</th>
//                             <th>Name</th>
//                             <th>Phone Number</th>
//                             <th>Email Address</th>
//                             <th>Address</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>{username}</td>
//                             <td>{firstname} {lastname}</td>
//                             <td>{phone_number}</td>
//                             <td>{email_address}</td>
//                             <td>{address} {city}, {state} {zipcode}</td>
//                         </tr>
//                     </tbody>
//                 </Table> 
//             </Container>
//             <Button className="col-md-5" onClick={(event) => onClickEdit(event, id)} variant="outline-secondary">Update User Information</Button>
//             <Container className="mt-3 d-flex justify-content-center" style={{ maxWidth: '1200px' }}>
//             {
//                 isEdited === true ?
//                 <Form onSubmit={(event) => edit(event, id)}>
//                     <Stack direction="vertical" gap={2} className="mt-2 justify-content-center">
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit First Name</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={firstname}
//                                 onChange={
//                                     (event) => setEditFirstname(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit Last Name</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={lastname}
//                                 onChange={
//                                     (event) => setEditLastname(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit Phone Number</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={phone_number}
//                                 minLength={10}
//                                 maxLength={10} 
//                                 onChange={
//                                     (event) => setEditPhone(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit Email</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={email_address}
//                                 onChange={
//                                     (event) => setEditEmail(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit Address</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={address}
//                                 onChange={
//                                     (event) => setEditAddress(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit City</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={city}
//                                 onChange={
//                                     (event) => setEditCity(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit State</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={state}
//                                 maxLength={2}
//                                 minLength={2}
//                                 onChange={
//                                     (event) => setEditState(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>Edit Zipcode</Form.Label>
//                             <Form.Control 
//                                 className='w-100'
//                                 type='text'
//                                 defaultValue={zipcode}
//                                 minLength={5}
//                                 maxLength={5}
//                                 onChange={
//                                     (event) => setEditZipcode(event.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Button className="mb-3" variant="outline-secondary" style={{ maxWidth: '200px' }} type="submit">Edit</Button>
//                         <p className="text-danger">{emailError}</p>
//                         <p className="text-danger">{errorMessage}</p>
//                     </Stack>
//                 </Form> : null
//             }
//             </Container>
//         </div>
//     );
};

export default Profile;