import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [categories, setCategories] = useState(localStorage.getItem('categories'))
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [token, role])
   
    useEffect(() => {
        Promise.all([fetchAllAnimals(), fetchAllCategories()])
        .then(([animals, categories]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
            setCategories(localStorage.setItem('categories', JSON.stringify(categories)))
        })
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('');
        setRole('');
        navigate('/login');
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Pet Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            {role === "admin" ? <Nav.Link href="/categories">Categories</Nav.Link> : null}
                            <Nav.Link href="/animals">Animals</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {role === "admin" ? <Nav.Link href="/customers_profile">Customers Profile</Nav.Link> : null}
                            {
                                role === "customer" ? 
                                <NavDropdown title="Profile" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile">Order History</NavDropdown.Item>
                                </NavDropdown>
                                : null
                            }
                            {role === "customer" ? <Nav.Link href="/shoppingCart">Shopping Cart</Nav.Link>: null}
                            {token ? null : <Nav.Link href="/register">Register</Nav.Link>}
                            {!token ?<Nav.Link href="/login">Login</Nav.Link>: " "}
                            {token ? <Button onClick={logout} variant="light">Log Out</Button> : ""}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <Outlet 
                    context={[
                        token, setToken
                    ]}
                />
            </main>
        </div>
    );
}