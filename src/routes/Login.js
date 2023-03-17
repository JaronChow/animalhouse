import CustomerLogin from "../components/CustomerLogin";
import { Nav } from 'react-bootstrap';

const Login = () => {
    return(
        <div style={{ maxWidth: '500px', margin: '60px auto 0px' }}>
                <Nav variant="tabs" fill></Nav>
                <div style={{ height: '430px', border: '1px solid #dee2e6', borderTop: 'none', borderRadius: '5px', padding: '10px' }}>
                    <CustomerLogin />
                </div>     
        </div>
    )
};

export default Login;