import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, resolvePath } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'));
    const [categories, setCategories] = useState([]);
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllAnimals(), fetchAllCategories()])
        .then(([animals, categories]) => {
            setAnimals(animals)
            setCategories(categories)
        })
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.setItem('login', 'false')
        setToken('');
        setRole('');
        setIsLoggedIn('false');
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center" style={{ fontFamily: 'Arial', color: '#444' }}>
                        <FontAwesomeIcon icon={faHouse} className="house-icon" />
                        <span className="ms-2">Animal House</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"><FontAwesomeIcon icon={faBars} /></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            {role === "admin" ? <Nav.Link as={Link} to="/animals">Animals</Nav.Link> : null}  
                            {role === "admin" ? <Nav.Link as={Link} to="/categories">Categories</Nav.Link> : null}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {role === "admin" ? <Nav.Link as={Link} to="/customers_profile">Customers Profile</Nav.Link> : null}
                            {
                                role === "customer" ? 
                                <NavDropdown title="Profile" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">Account</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/orderhistory">Order History</NavDropdown.Item>
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
            <Outlet 
                context={{
                    token, setToken,
                    role, setRole,
                    isLoggedIn, setIsLoggedIn,
                    categories, setCategories,
                    animals, setAnimals
                }}
            />
            </main>
        </>
    );
}