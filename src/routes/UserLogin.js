import Login from "../components/Login";
import { Nav } from 'react-bootstrap';

const UserLogin = () => {
    return(
        <div style={{ maxWidth: '500px', margin: '60px auto 0px' }}>
                <Nav variant="tabs" fill></Nav>
                <div style={{ height: '430px', border: '1px solid #dee2e6', borderTop: 'none', borderRadius: '5px', padding: '10px' }}>
                    <Login />
                </div>     
        </div>
    )
};

export default UserLogin;