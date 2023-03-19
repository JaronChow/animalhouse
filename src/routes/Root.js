import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, resolvePath } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'));
    const [categories, setCategories] = useState(localStorage.getItem('categories'));
    const [animals, setAnimals] = useState(localStorage.getItem('animals'));
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
        localStorage.setItem('login', false);
        setToken('');
        setRole('');
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Pet Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            {role === "admin" ? <Nav.Link as={Link} to="/categories">Categories</Nav.Link> : null}
                            <Nav.Link as={Link} to="/animals">Animals</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {role === "admin" ? <Nav.Link as={Link} to="/customers_profile">Customers Profile</Nav.Link> : null}
                            {
                                role === "customer" ? 
                                <NavDropdown title="Profile" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">Account</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/profile">Order History</NavDropdown.Item>
                                </NavDropdown>
                                : null
                            }
                            {role === "customer" ? <Nav.Link as={Link} to="/shoppingCart">Shopping Cart</Nav.Link>: null}
                            {token ? null: <Nav.Link as={Link} to="/register">Register</Nav.Link>}
                            {token ? null: <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                            {token ? <Button onClick={logout} variant="light">Log Out</Button> : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
            <Outlet />
            </main>
        </>
    );
}