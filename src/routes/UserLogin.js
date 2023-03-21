import Login from "../components/Login";
import { Container, Card } from "react-bootstrap";

const UserLogin = () => {
    return(
        <Container style={{ maxWidth: '500px', margin: '60px auto 0px' }}>
                <Card style={{ height: '430px', padding: '10px' }}>
                    <Login />
                </Card>     
        </Container>
    )
};

export default UserLogin;