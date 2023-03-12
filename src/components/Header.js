import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('');
        setRole('');
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="home" className="linkStyle">Home</Nav.Link>
                <Nav.Link href="animals" className="linkStyle">Animals</Nav.Link>
                {role === "admin" ? <Nav.Link href="categories" className="linkStyle">Categories</Nav.Link> : null}
                {role === "admin" ? <Nav.Link href="customers_profile" className="linkStyle">Customers Profile</Nav.Link> : null}
                {role === "customer" ? <Nav.Link href="profile" className="linkStyle">Order History</Nav.Link> : null}
                {role === "customer" ? <Nav.Link href="shoppingCart" className="linkStyle">Shopping Cart</Nav.Link>: null}
                {token ? null : <Nav.Link href="register" className="linkStyle">Register</Nav.Link>}
                {token ? null : <Nav.Link href="login" className="linkStyle">Login</Nav.Link>}
                {token ? <button type="button" onClick={logout} className="logoutButton">Log Out</button> : null}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default Header;