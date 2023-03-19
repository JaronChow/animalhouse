import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, resolvePath } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
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
    }, [categories, animals]);

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
                    <Navbar.Brand as={Link} to="/home">Animal House</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                                    <NavDropdown.Item as={Link} to="/profile">Order History</NavDropdown.Item>
                                </NavDropdown>
                                : null
                            }
                            {role === "customer" ?<Button type = 'button' onclick = ""> <AiOutlineShopping /> <span className='cart-qauntity'>1</span></Button>: null}
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