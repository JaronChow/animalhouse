import { fetchAllUsers } from "../api/API";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const CustomersProfile = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        Promise.all([fetchAllUsers()])
        .then(([users]) => {
            setUsers(users)
        })
    }, []);

    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="mt-4">Users Profile</h3>
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
                        {users.filter(user => user.role === 'customer').map(({ id, firstname, lastname, username, phone_number, email_address, address, city, state, zipcode }) => (
                            <tr key={id}>
                                <td>{username}</td>
                                <td>{firstname} {lastname}</td>
                                <td>{phone_number}</td>
                                <td>{email_address}</td>
                                <td>{address}, {city}, {state}, {zipcode}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
};

export default CustomersProfile;