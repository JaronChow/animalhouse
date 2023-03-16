import AdminLogin from "../components/AdminLogin";
import CustomerLogin from "../components/CustomerLogin";
import { Tab, Nav } from 'react-bootstrap';

const Login = () => {
    return(
        <div style={{ maxWidth: '800px', margin: '60px auto 0px' }}>
            <Tab.Container defaultActiveKey="tab1">
                <Nav variant="tabs" fill>
                    <Nav.Item>
                        <Nav.Link eventKey="tab1">Log In as Admin</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="tab2">Log In as Customer</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div style={{ height: '410px', border: '1px solid #dee2e6', borderTop: 'none', borderRadius: '5px', padding: '10px' }}>
                <Tab.Content>
                    <Tab.Pane eventKey="tab1"><AdminLogin /></Tab.Pane>
                    <Tab.Pane eventKey="tab2"><CustomerLogin /></Tab.Pane>
                </Tab.Content> 
                </div>     
            </Tab.Container>
        </div>
    )
};

export default Login;